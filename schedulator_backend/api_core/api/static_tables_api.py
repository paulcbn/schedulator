from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from api_core.models import StaticTable
from api_core.serializers.static_tables_serializers import StaticTableSerializer, StaticTableHierarchySerializer, \
    SubjectPageSerializer, TeacherPageSerializer
from api_core.services.static_table_service import get_static_tables_hierarchy, search_subjects_paged, search_teachers_paged


class StaticTableAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        if 'search_id' in request.GET:
            result = StaticTable.objects.filter(search_id=request.GET['search_id'])
            if len(result) == 1:
                serializer = StaticTableSerializer(result[0])
                return Response(serializer.data)
        return Response([])


class FormationsStaticTableHierarchyAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        if 'section_id' in request.GET:
            hierarchy = get_static_tables_hierarchy(request.GET['section_id'])
            serializer = StaticTableHierarchySerializer(hierarchy)
            return Response(serializer.data)
        return Response(status=400)


class SubjectStaticTableAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        if 'search_string' in request.GET:
            page_index = request.GET.get('page', 1)
            search_result = search_subjects_paged(request.GET['search_string'], page_index)
        else:
            search_result = search_subjects_paged('', 1)

        serializer = SubjectPageSerializer(search_result)
        return Response(serializer.data)


class TeacherStaticTableAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        if 'search_string' in request.GET:
            page_index = request.GET.get('page', 1)
            search_result = search_teachers_paged(request.GET['search_string'], page_index)
        else:
            search_result = search_teachers_paged('', 1)

        serializer = TeacherPageSerializer(search_result)
        return Response(serializer.data)
