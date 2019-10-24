from django.core.management.base import BaseCommand, CommandError

from crawler.service.section_crawler import SectionCrawler
from crawler.service.subject_crawler import SubjectCrawler


class Command(BaseCommand):
    help = 'Gets the schedule from the university site'

    def handle(self, *args, **options):
        subject_crawler = SubjectCrawler()
        subject_crawler.get_data()

        section_crawler = SectionCrawler()
        section_crawler.get_data()
