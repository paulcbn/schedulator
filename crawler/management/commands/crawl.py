from django.core.management.base import BaseCommand

from crawler.models import Subject, Section, SubjectComponent, Formation
from crawler.service.crawlers.formation_crawler import FormationCrawler
from crawler.service.crawlers.section_crawler import SectionCrawler
from crawler.service.crawlers.subject_component_crawler import SubjectComponentCrawler
from crawler.service.crawlers.subject_crawler import SubjectCrawler


class Command(BaseCommand):
    help = 'Gets the schedule from the university site'

    def handle(self, *args, **options):
        Formation.objects.all().delete()
        SubjectComponent.objects.all().delete()
        Subject.objects.all().delete()
        Section.objects.all().delete()

        subject_crawler = SubjectCrawler()
        subject_crawler.get_data()

        section_crawler = SectionCrawler()
        section_crawler.get_data()

        subject_component_crawler = SubjectComponentCrawler()
        subject_component_crawler.get_data()

        formation_crawler = FormationCrawler()
        formation_crawler.get_data()
