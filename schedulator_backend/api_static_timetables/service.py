import operator
import re
from functools import reduce

from django.core.paginator import Paginator
from django.db.models import Q

from .models import StaticTable
from crawler.models import Formation, Subject, TimetableEntry


class StaticTableHierarchy:
    def __init__(self, formation, search_id):
        self.formation = formation
        self.search_id = search_id
        self.children = []


def _key_for_sort(formation):
    if formation.formation_type == Formation.SECTION:
        return 0
    if formation.formation_type == Formation.GROUP:
        return 1
    if formation.formation_type == Formation.SEMIGROUP:
        return 2
    return 3


def _get_hierarchy_index(hierarchy_list, name):
    for index, item in enumerate(hierarchy_list):
        if item.formation.name == name:
            return index
    return -1


def _add_static_table_to_hierarchy(hierarchy: StaticTableHierarchy, static_table):
    formations = sorted(static_table.formations.all(), key=_key_for_sort)
    current_hierarchy = hierarchy
    if len(formations) == 0:
        return
    while len(formations) > 1:
        children = current_hierarchy.children
        current_formation = formations[0]
        index = _get_hierarchy_index(children, current_formation.name)
        if index == -1:
            children.append(StaticTableHierarchy(current_formation, None))
            index = len(children) - 1
        current_hierarchy = children[index]
        formations.pop(0)

    children = current_hierarchy.children
    current_formation = formations[0]
    children.append(StaticTableHierarchy(current_formation, static_table.search_id))


def _sort_children(hierarchy):
    hierarchy.children.sort(key=lambda h: h.formation.name)
    for child in hierarchy.children:
        _sort_children(child)


def get_static_tables_hierarchy(section_id):
    static_tables = StaticTable.objects.filter(section__id=section_id)
    hierarchy = StaticTableHierarchy(None, None)
    for table in static_tables:
        _add_static_table_to_hierarchy(hierarchy, table)

    if len(hierarchy.children) == 0:
        return None
    _sort_children(hierarchy)

    return hierarchy.children[0]


def get_search_id_for_formations(formations):
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


def get_search_id_for_teacher(teacher):
    alpha_num_regex = re.compile('[^0-9a-zA-Z]+')
    teacher = alpha_num_regex.sub(' ', teacher)
    return '-'.join(teacher.split())


def get_search_id_for_subject(subject):
    alpha_num_regex = re.compile('[^0-9a-zA-Z]+')
    sid = alpha_num_regex.sub(' ', subject.sid)
    return '-'.join(sid.split())


def get_most_relevant_formation(static_table):
    formations = sorted(static_table.formations.all(), key=_key_for_sort)
    return formations[-1]


def get_most_relevant_teacher(static_table):
    attendances = static_table.attendances.all()
    return attendances[0].teacher


def get_most_relevant_subject(static_table):
    attendances = static_table.attendances.all()
    return attendances[0].subject


def search_subjects_paged(search_string, page_index):
    fields = search_string.split()

    query = Q()
    query = reduce(operator.and_, map(lambda field: Q(name__icontains=field), fields), query)
    query = reduce(operator.or_, map(lambda field: Q(alias__iexact=field), fields), query)
    query_set = Subject.objects.filter(query).prefetch_related('section_set').order_by('name')

    paginator = Paginator(query_set, 5)
    return {'current_page': page_index, 'page_count': paginator.num_pages,
            'subjects': paginator.get_page(page_index).object_list}


def search_teachers_paged(search_string, page_index):
    fields = search_string.split()

    query = Q()
    query = reduce(operator.and_, map(lambda field: Q(teacher__icontains=field), fields), query)
    teacher_names = TimetableEntry.objects.filter(query).order_by('teacher').values_list('teacher', flat=True).distinct()

    paginator = Paginator(teacher_names, 5)
    return {'current_page': page_index, 'page_count': paginator.num_pages,
            'teachers': paginator.get_page(page_index).object_list}
