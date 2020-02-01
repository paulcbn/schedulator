import datetime
import logging

from django.db import transaction

from crawler.models import Section, TimetableEntry, SubjectComponent, Room, Formation
from crawler.service.crawler_exception import CrawlerException
from crawler.service.soup_utils import get_soup_from_url, skip_first

logger = logging.getLogger(__name__)


def parse_day(day_string: str):
    possibilities = (
        ('luni', TimetableEntry.MONDAY),
        ('marti', TimetableEntry.TUESDAY),
        ('miercuri', TimetableEntry.WEDNESDAY),
        ('joi', TimetableEntry.THURSDAY),
        ('vineri', TimetableEntry.FRIDAY),
        ('sambata', TimetableEntry.SATURDAY),
        ('duminica', TimetableEntry.SUNDAY),
    )

    for token, day in possibilities:
        if token.lower().strip() in day_string.lower():
            return day

    raise CrawlerException(f'Could not parse day string: {day_string}')


def parse_time_interval(time_interval):
    start_hour, end_hour = time_interval.split('-')
    return datetime.time(hour=int(start_hour)), datetime.time(hour=int(end_hour))


def parse_frequency(frequency_string):
    possibilities = (
        ('sapt. 1', TimetableEntry.ODD_WEEKS),
        ('sapt. 2', TimetableEntry.EVEN_WEEKS),
        ('', TimetableEntry.ALL_WEEKS)
    )

    for token, day in possibilities:
        if token.lower().strip() in frequency_string.lower():
            return day


def parse_room(room_string):
    return Room.objects.get(name=room_string.strip())


def parse_formation(formation_string):
    return Formation.objects.get(name=formation_string.strip())


def parse_subject_component(component_name, subject_url):
    subject_id = subject_url[len('../disc/'):-len('.html')]
    return SubjectComponent.objects.get(name=component_name.strip(), subject__sid=subject_id)


def parse_entry_from_row(row, already_found_values):
    columns = row.find_all('td')
    if len(columns) != 8:
        raise CrawlerException('Could not find exactly 8 <td> elements.')

    values = tuple(map(lambda td: td.string.strip(), columns))

    if values in already_found_values:
        return None
    already_found_values.add(values)

    day = parse_day(values[0])  # uniq
    start_time, end_time = parse_time_interval(values[1])  # uniq
    frequency = parse_frequency(values[2])  # uniq
    room = parse_room(values[3])  # uniq
    formation = parse_formation(values[4])  # uniq
    subject_component = parse_subject_component(values[5], columns[6].a['href'])  # uniq
    teacher = values[7]

    return TimetableEntry(
        week_day=day,
        start_time=start_time,
        end_time=end_time,
        frequency=frequency,
        room=room,
        subject_component=subject_component,
        formation=formation,
        teacher=teacher
    )


def parse_entries_from_table(table, already_found_values):
    entries = []
    for row in skip_first(table.find_all('tr')):
        try:
            entry = parse_entry_from_row(row, already_found_values)
            if entry is not None:
                entries.append(entry)
        except Exception as exc:
            logger.warning(f'CrawlerError occurred: Could not parse section from {row}: {exc}')
    return entries


def parse_entries_from_tables(tables):
    entries = []
    already_found_values = set()
    for table in tables:
        entries.extend(parse_entries_from_table(table, already_found_values))
    return entries


class TimetableEntryCrawler:
    def __init__(self, sections_base_url='http://www.cs.ubbcluj.ro/files/orar/2019-1/tabelar'):
        self.sections_base_url = sections_base_url

    def get_timetable_entries(self):
        entries = []

        sections = Section.objects.all()
        for section in sections:
            logger.info(f'Parsing timetable entries for section {section.name}.')
            section_url = f'{self.sections_base_url}/{section.url}'
            soup = get_soup_from_url(section_url)

            new_entries = parse_entries_from_tables(soup.find_all('table'))
            logger.info(f'Found {len(new_entries)} new entries.')
            entries.extend(new_entries)

        with transaction.atomic():
            for entry in entries:
                entry.save()

    def get_data(self):
        self.get_timetable_entries()
