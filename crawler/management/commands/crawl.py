from django.core.management.base import BaseCommand

from crawler.models import Subject, Section, SubjectComponent, Formation, Room, TimetableEntry
from crawler.service.crawlers.formation_crawler import FormationCrawler
from crawler.service.crawlers.room_crawler import RoomCrawler
from crawler.service.crawlers.section_crawler import SectionCrawler
from crawler.service.crawlers.subject_component_crawler import SubjectComponentCrawler
from crawler.service.crawlers.subject_crawler import SubjectCrawler
from crawler.service.crawlers.timetable_entry_crawler import TimetableEntryCrawler


class Command(BaseCommand):
    help = 'Gets the schedule from the university site'

    def handle(self, *args, **options):
        TimetableEntry.objects.all().delete()
        Room.objects.all().delete()
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

        room_crawler = RoomCrawler()
        room_crawler.get_data()

        timetable_entry_crawler = TimetableEntryCrawler()
        timetable_entry_crawler.get_data()
