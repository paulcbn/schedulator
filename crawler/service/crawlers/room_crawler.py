import logging

from django.db import transaction

from crawler.models import Room
from crawler.service.crawler_exception import CrawlerException
from crawler.service.soup_utils import get_soup_from_url, skip_first

logger = logging.getLogger(__name__)


def parse_room_from_row(row):
    columns = row.find_all('td')
    if len(columns) != 2:
        raise CrawlerException('Expected exactly 2 td elements. ')
    name = columns[0].string
    if name.isspace():
        raise CrawlerException('Expected non empty room name. ')

    description = columns[1].string

    return Room(name=name, description=description)


def parse_rooms_from_table(table):
    rooms = []
    for row in skip_first(table.find_all('tr')):
        try:
            rooms.append(parse_room_from_row(row))
        except CrawlerException as exc:
            logger.warning(f'Could not parse room from {row}: {exc}')

    return rooms


class RoomCrawler:
    def __init__(self, rooms_url="http://www.cs.ubbcluj.ro/files/orar/2019-1/sali/legenda.html"):
        self.rooms_url = rooms_url

    def get_rooms(self):
        soup = get_soup_from_url(self.rooms_url)
        rooms = parse_rooms_from_table(soup.find("table"))

        with transaction.atomic():
            for room in rooms:
                room.save()

    def get_data(self):
        self.get_rooms()
