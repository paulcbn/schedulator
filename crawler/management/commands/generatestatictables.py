from django.core.management import BaseCommand

from api.models import StaticTable
from crawler.models import Section, Formation, TimetableEntry


class Command(BaseCommand):
    help = "Generate static tables for unauthenticated users"

    def handle(self, *args, **options):
        StaticTable.objects.all().delete()
        for section, *formations_list in self._get_tuples():
            for formations in formations_list:
                static_table = StaticTable.objects.create(
                    section=section,
                    search_id=self._get_search_id(formations)
                )
                static_table.formations.set(formations)
                static_table.attendances.set(TimetableEntry.objects.filter(formation__in=formations))

    def _get_search_id(self, formations):
        sect, group, semigroup = None, None, None
        for formation in formations:
            if formation.formation_type == Formation.SECTION:
                sect = formation
            elif formation.formation_type == Formation.SEMIGROUP:
                semigroup = formation
            elif formation.formation_type == Formation.GROUP:
                group = formation

        if group is not None and semigroup is not None:
            group = None

        sorted_formations = filter(lambda f: f is not None, [sect, group, semigroup])
        sorted_formations = map(lambda f: f.name, sorted_formations)
        return '-'.join(sorted_formations).replace('/', '-')

    def _backtrack(self, formation_sets):
        if len(formation_sets) == 0:
            return [tuple(), ]
        result = []
        partial_results = self._backtrack(formation_sets[1:])
        for section in formation_sets[0]:
            for partial_result in partial_results:
                result.append((section, *partial_result))
        return result

    def _get_tuples(self):
        StaticTable.objects.all().delete()
        for section in Section.objects.all():
            formations_for_section = Formation.objects.filter(section=section)
            section_formations = formations_for_section.filter(formation_type=Formation.SECTION)
            group_formations = formations_for_section.filter(formation_type=Formation.GROUP)

            if len(group_formations) == 0:
                semigroup_formations = formations_for_section.filter(formation_type=Formation.SEMIGROUP)
                section_sets = list(filter(lambda query_set: len(query_set) > 0,
                                           [section_formations, semigroup_formations]))
                yield (section, *self._backtrack(section_sets))

            else:
                for group in group_formations:
                    semigroup_formations = formations_for_section \
                        .filter(formation_type=Formation.SEMIGROUP) \
                        .filter(name__icontains=group.name)
                    section_sets = list(filter(lambda query_set: len(query_set) > 0,
                                               [section_formations, [group], semigroup_formations]))
                    yield (section, *self._backtrack(section_sets))
