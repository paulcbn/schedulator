from django.core.management.base import BaseCommand

from crawler.models import Formation, Section


def get_type(formation, section_codes):
    if formation.name in section_codes:
        return Formation.SECTION

    if formation.name.isdecimal():
        return Formation.GROUP
    try:
        slash_index = formation.name.index('/')
        group_number = formation.name[:slash_index]
        semigroup_number = formation.name[slash_index + 1:]

        if group_number.isdecimal() and semigroup_number.isdecimal():
            return Formation.SEMIGROUP
    except ValueError:
        return Formation.UNKNOWN
    return Formation.UNKNOWN


class Command(BaseCommand):
    help = 'Decides based on a heuristic what the formation types should be for all existing formations. '

    def handle(self, *args, **options):
        section_codes = set(map(lambda section: section.url[:-len('.html')], Section.objects.all()))
        for formation in Formation.objects.all():
            formation.formation_type = get_type(formation, section_codes)
            formation.save()
