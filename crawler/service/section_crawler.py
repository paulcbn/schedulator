import logging

from django.db import transaction

from crawler.models import Section
from crawler.service.crawler_exception import CrawlerException
from crawler.service.soup_utils import get_soup_from_url


def parse_degree_tables(soup):
    tables = soup.find_all('table')
    if len(tables) != 2:
        raise CrawlerException("Didn't find exactly 2 tables.")
    return tables


def parse_row(row):
    columns = row.find_all('td')
    if len(columns) <= 1:
        raise CrawlerException('Not enough columns. ')

    sections = []
    section_name = columns[0].string
    for year in columns[1:]:
        if year.string.isspace():
            continue
        sections.append(Section(name=section_name, year=year.string))

    return sections


def parse_table(table):
    rows = table.find_all('tr')
    result = []
    for row in rows:
        try:
            sections = parse_row(row)
            result += sections
        except CrawlerException as exc:
            logging.warning(f'Could not parse section from {row}: {exc}')

    return result


class SectionCrawler:
    def __init__(self, subjects_url='http://www.cs.ubbcluj.ro/files/orar/2019-1/tabelar/index.html'):
        self.subjects_url = subjects_url

    def get_sections(self):
        soup = get_soup_from_url(self.subjects_url)
        table_bachelor_degree, table_master_degree = parse_degree_tables(soup)

        bachelor_sections = parse_table(table_bachelor_degree)
        master_sections = parse_table(table_master_degree)

        with transaction.atomic():
            for section in bachelor_sections:
                section.type = 'B'
                section.save()

            for section in master_sections:
                section.type = 'M'
                section.save()

        # TODO: ADD SECTION SUBJECTS

    def get_data(self):
        self.get_sections()
