import logging

from django.db import transaction

from crawler.models import Section, Formation
from crawler.service.crawler_exception import CrawlerException
from crawler.service.soup_utils import get_soup_from_url

logger = logging.getLogger(__name__)


def parse_formation_name_from_row(row):
    columns = row.find_all('td')
    if len(columns) != 8:
        raise CrawlerException('Could not find exactly 8 <td> elements.')

    return columns[4].string


def parse_formations_from_table(table):
    formation_names = set()
    for row in table.find_all('tr'):
        try:
            formation_names.add(parse_formation_name_from_row(row))
        except CrawlerException as exc:
            logger.warning(f'Could not parse formation from {row}: {exc}')

    return formation_names


def parse_formations_from_tables(tables, target_section):
    formation_names = set()
    for table in tables:
        formation_names.update(parse_formations_from_table(table))
    return map(lambda name: Formation(section=target_section, name=name), formation_names)


class FormationCrawler:
    def __init__(self, sections_base_url="http://www.cs.ubbcluj.ro/files/orar/2019-1/tabelar"):
        self.sections_base_url = sections_base_url

    def get_formations(self):
        to_be_added = []

        for section in Section.objects.all():
            section_url = f'{self.sections_base_url}/{section.url}'
            soup = get_soup_from_url(section_url)
            tables = soup.find_all('table')
            to_be_added.extend(parse_formations_from_tables(tables, section))

        with transaction.atomic():
            for formation in to_be_added:
                formation.save()

    def get_data(self):
        self.get_formations()
