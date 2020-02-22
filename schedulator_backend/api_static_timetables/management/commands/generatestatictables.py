from django.core.management import BaseCommand

from api_static_timetables.models import StaticTable
from api_static_timetables.service import get_search_id_for_formations, get_search_id_for_subject, \
    get_search_id_for_teacher
from crawler.models import Section, Formation, TimetableEntry, Subject


def backtrack_through_formations(formation_sets):
    if len(formation_sets) == 0:
        return [tuple(), ]
    result = []
    partial_results = backtrack_through_formations(formation_sets[1:])
    for section in formation_sets[0]:
        for partial_result in partial_results:
            result.append((section, *partial_result))
    return result


def get_tuples_for_formations():
    for section in Section.objects.all():
        formations_for_section = Formation.objects.filter(section=section)
        section_formations = formations_for_section.filter(formation_type=Formation.SECTION)
        group_formations = formations_for_section.filter(formation_type=Formation.GROUP)

        if len(group_formations) == 0:
            semigroup_formations = formations_for_section.filter(formation_type=Formation.SEMIGROUP)
            section_sets = list(filter(lambda query_set: len(query_set) > 0,
                                       [section_formations, semigroup_formations]))
            yield (section, *backtrack_through_formations(section_sets))

        else:
            for group in group_formations:
                semigroup_formations = formations_for_section \
                    .filter(formation_type=Formation.SEMIGROUP) \
                    .filter(name__icontains=group.name)
                section_sets = list(filter(lambda query_set: len(query_set) > 0,
                                           [section_formations, [group], semigroup_formations]))
                yield (section, *backtrack_through_formations(section_sets))


def generate_static_tables_for_formations():
    for section, *formations_list in get_tuples_for_formations():
        for formations in formations_list:
            search_id = get_search_id_for_formations(formations)

            if StaticTable.objects.filter(search_id=search_id).count() == 0 and search_id.strip() != '':
                static_table = StaticTable.objects.create(
                    search_id=search_id,
                    section=section,
                    teacher=None,
                    subject=None,
                )
                static_table.formations.set(formations)
                static_table.attendances.set(TimetableEntry.objects.filter(formation__in=formations))
            else:
                print(f'WARNING: invalid search string for section \'{section}\': \'{search_id}\'')


def generate_static_tables_for_teachers():
    teachers = TimetableEntry.objects.values_list('teacher', flat=True).distinct()
    for teacher in teachers:
        static_table = StaticTable.objects.create(
            search_id=get_search_id_for_teacher(teacher),
            section=None,
            teacher=teacher,
            subject=None,
        )
        static_table.attendances.set(TimetableEntry.objects.filter(teacher=teacher))


def generate_static_tables_for_subjects():
    for subject in Subject.objects.all():
        static_table = StaticTable.objects.create(
            search_id=get_search_id_for_subject(subject),
            section=None,
            teacher=None,
            subject=subject,
        )
        static_table.attendances.set(TimetableEntry.objects.filter(subject_component__subject=subject))


class Command(BaseCommand):
    help = "Generate static tables for unauthenticated users"

    def handle(self, *args, **options):
        print('Deleting old tables.')
        StaticTable.objects.all().delete()
        print('Generating static tables for formations.')
        generate_static_tables_for_formations()
        print('Generating static tables for teachers.')
        generate_static_tables_for_teachers()
        print('Generating static tables for subjects.')
        generate_static_tables_for_subjects()
