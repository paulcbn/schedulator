from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from api.models import StaticTable
from api.serializers.static_tables_serializers import StaticTableSerializer, StaticTableHierarchySerializer
from api.services.static_table_service import get_static_tables_hierarchy


class StaticTableAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        if 'search_id' in request.GET:
            result = StaticTable.objects.filter(search_id=request.GET['search_id'])
            if len(result) == 1:
                serializer = StaticTableSerializer(result[0])
                return Response(serializer.data)
        return Response([])


class StaticTableHierarchyAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        if 'section_id' in request.GET:
            hierarchy = get_static_tables_hierarchy(request.GET['section_id'])
            serializer = StaticTableHierarchySerializer(hierarchy)
            return Response(serializer.data)
        return Response(status=400)
