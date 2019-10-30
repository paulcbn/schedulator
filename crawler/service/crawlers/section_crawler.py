import logging

from django.db import transaction

from crawler.models import Section, Subject
from crawler.service.crawler_exception import CrawlerException
from crawler.service.soup_utils import get_soup_from_url

logger = logging.getLogger(__name__)


def parse_degree_tables(soup):
    """
    :param soup: BeautifulSoup of the entire section page
    :return: a tuple with 2 NavigableString objects with the tables for the bachelor's,
             and master's degree sections, respectively
    :raises CrawlerException: if it cannot find exactly 2 tables
    """
    tables = soup.find_all('table')
    if len(tables) != 2:
        raise CrawlerException("Didn't find exactly 2 tables.")
    return tables


def parse_section_row(row):
    """
    Parse the table row to get all the sections (same name, different years) with their
    specific url.
    :param row: NavigationString from BeautifulSoup containing a row with potential
                section data (name, year)
    :return: list of tuples of the form (Section, section_url)
    """
    columns = row.find_all('td')
    if len(columns) <= 1:
        raise CrawlerException('Not enough columns. ')

    sections = []
    section_name = columns[0].string
    for year in columns[1:]:
        if year.string.isspace():
            continue
        if year.a['href'].isspace():
            continue
        sections.append(Section(name=section_name, year=year.string, url=year.a['href']))

    return sections


def parse_section_table(table):
    """
    Parse the table to get all the sections and their specific url.
    :param table: NavigableString
    :return: list of tuples of the form (Section, section_url)
    """
    rows = table.find_all('tr')
    result = []
    for row in rows:
        try:
            sections = parse_section_row(row)
            result += sections
        except CrawlerException as exc:
            logger.warning(f'CrawlerError occurred: Could not parse section from {row}: {exc}')
        except Exception as exc:
            logger.warning(f'Other error occurred: Could not parse section from {row}: {exc}')

    return result


def parse_timetable_row(row):
    """
    Parse the timetable row the section id from the correspondent column.
    :param row: NavigationString from BeautifulSoup containing a row with timetable data
    :return: id of the subject referenced in the row
    """
    columns = row.find_all('td')
    if len(columns) != 8:
        raise CrawlerException('Expected exactly 8 td elements. ')
    subject_url: str = columns[6].a['href']
    if subject_url.isspace():
        raise CrawlerException('Expected non empty subject url. ')
    return subject_url[len('../disc/'):-len('.html')]


class SectionCrawler:
    def __init__(self,
                 subjects_url='http://www.cs.ubbcluj.ro/files/orar/2019-1/tabelar/index.html',
                 section_base_url='http://www.cs.ubbcluj.ro/files/orar/2019-1/tabelar'):
        self.subjects_url = subjects_url
        self.base_url = section_base_url

    def get_sections(self):
        """
        Crawls the subject_urls page and saves all the Section objects and
        all the SectionSubject objects to the db.
        """
        soup = get_soup_from_url(self.subjects_url)
        table_bachelor_degree, table_master_degree = parse_degree_tables(soup)

        bachelor_sections = parse_section_table(table_bachelor_degree)
        master_sections = parse_section_table(table_master_degree)

        with transaction.atomic():
            for section in bachelor_sections:
                section.type = 'B'
                section.save()
                section.default_subjects.set(self.get_default_subjects(section.url))
                section.save()

            for section in master_sections:
                section.type = 'M'
                section.save()
                section.default_subjects.set(self.get_default_subjects(section.url))
                section.save()

    def get_data(self):
        self.get_sections()

    def get_default_subjects(self, url):
        """
        Crawls the given url of the section for the default subjects.
        Target url has the form: {self.base_url}/{url}
        :param url: string with the section url
        :return: Queryset of Subject that correspond to the url.
        """

        subject_ids = set()

        full_url = f'{self.base_url}/{url}'
        soup = get_soup_from_url(full_url)
        first_table = soup.find('table')  # we care only about the first table

        for row in first_table.find_all('tr'):
            try:
                subject_id = parse_timetable_row(row)
                subject_ids.add(subject_id)
            except CrawlerException as exc:
                logger.warning(f'CrawlerError occurred: Could not parse subject id from {row}: {exc}')
            except Exception as exc:
                logger.warning(f'Other error occurred: Could not parse subject id from {row}: {exc}')

        return Subject.objects.filter(pk__in=subject_ids)
