from api.models import StaticTable
from crawler.models import Formation


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


def get_most_relevant_formation(static_table):
    formations = sorted(static_table.formations.all(), key=_key_for_sort)
    return formations[-1]
