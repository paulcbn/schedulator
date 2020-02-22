from django.core.management.base import BaseCommand

from crawler.models import Subject, Section, SubjectComponent, Formation, Room, TimetableEntry
from crawler.service.crawlers.formation_crawler import FormationCrawler
from crawler.service.crawlers.room_crawler import RoomCrawler
from crawler.service.crawlers.section_crawler import SectionCrawler
from crawler.service.crawlers.subject_component_crawler import SubjectComponentCrawler
from crawler.service.crawlers.subject_crawler import SubjectCrawler
from crawler.service.crawlers.timetable_entry_crawler import TimetableEntryCrawler
from schedulator_backend.settings import UNIVERSITY_TIMETABLE_ROOT_URL


class Command(BaseCommand):
    help = 'Gets the schedule from the university site'

    def handle(self, *args, **options):
        if len(args) > 0:
            timetable_root_url = args[0]
        else:
            timetable_root_url = UNIVERSITY_TIMETABLE_ROOT_URL

        TimetableEntry.objects.all().delete()
        Room.objects.all().delete()
        Formation.objects.all().delete()
        SubjectComponent.objects.all().delete()
        Subject.objects.all().delete()
        Section.objects.all().delete()

        subject_crawler = SubjectCrawler(subjects_url=f'{timetable_root_url}disc/index.html')
        subject_crawler.get_data()

        section_crawler = SectionCrawler(sections_base_url=f'{timetable_root_url}tabelar')
        section_crawler.get_data()

        subject_component_crawler = SubjectComponentCrawler(subjects_base_url=f'{timetable_root_url}disc')
        subject_component_crawler.get_data()

        formation_crawler = FormationCrawler(sections_base_url=f'{timetable_root_url}tabelar')
        formation_crawler.get_data()

        room_crawler = RoomCrawler(rooms_url=f'{timetable_root_url}sali/legenda.html')
        room_crawler.get_data()

        timetable_entry_crawler = TimetableEntryCrawler(sections_base_url=f'{timetable_root_url}tabelar')
        timetable_entry_crawler.get_data()
