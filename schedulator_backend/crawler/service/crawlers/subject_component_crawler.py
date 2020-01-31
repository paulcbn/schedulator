import logging

from django.db import transaction

from crawler.models import Subject, SubjectComponent
from crawler.service.crawler_exception import CrawlerException
from crawler.service.soup_utils import get_soup_from_url, skip_first

logger = logging.getLogger(__name__)


def parse_subject_component_row(row):
    columns = row.find_all('td')
    if len(columns) != 8:
        raise CrawlerException('Could not find exactly 8 <td> elements.')

    component_name = columns[6].string

    return component_name


def parse_subject_table(table, target_subject):
    names_set = set()
    for row in skip_first(table.find_all('tr')):
        try:
            names_set.add(parse_subject_component_row(row))
        except CrawlerException as exc:
            logger.warning(f'Could not parse component from {row}: {exc}')

    subject_components = map(lambda name: SubjectComponent(subject=target_subject, name=name), names_set)
    return subject_components


class SubjectComponentCrawler:
    def __init__(self, subjects_base_url="http://www.cs.ubbcluj.ro/files/orar/2019-1/disc"):
        self.subjects_base_url = subjects_base_url

    def get_subject_components(self):
        to_be_added = []

        for subject in Subject.objects.all():
            subject_url = f'{self.subjects_base_url}/{subject.url}'
            soup = get_soup_from_url(subject_url)
            subject_components = parse_subject_table(soup.find('table'), subject)
            to_be_added.extend(subject_components)

        with transaction.atomic():
            for subject_component in to_be_added:
                subject_component.save()

    def get_data(self):
        self.get_subject_components()
