import logging
from crawler.models import Subject
from crawler.service.crawler_exception import CrawlerException
from crawler.service.soup_utils import get_soup_from_url
from django.db import transaction

logger = logging.getLogger(__name__)


def parse_subject_row(row):
    columns = row.find_all('td')
    if len(columns) != 2:
        raise CrawlerException('Could not find exactly 2 <td> elements.')
    sid: str = columns[0].string
    name = columns[1].string
    url = columns[1].a['href']

    if sid.isspace() or name.isspace():
        raise CrawlerException('Empty fields.')

    return Subject(sid=sid, name=name, url=url)


class SubjectCrawler:
    def __init__(self, subjects_url='http://www.cs.ubbcluj.ro/files/orar/2019-1/disc/index.html'):
        self.subjects_url = subjects_url

    def get_subjects(self):
        soup = get_soup_from_url(self.subjects_url)
        table = soup.html.body.center.table

        subjects = []

        for row in table.find_all('tr'):
            try:
                subjects.append(parse_subject_row(row))
            except CrawlerException as exc:
                logger.warning(f'Could not parse subject from {row}: {exc}')

        with transaction.atomic():
            for subject in subjects:
                subject.save()

    def get_data(self):
        self.get_subjects()
