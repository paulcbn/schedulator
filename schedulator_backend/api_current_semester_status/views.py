from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from api_current_semester_status.serializers import CurrentSemesterStatusSerializer
from api_current_semester_status.service import get_current_week


class CurrentSemesterStatusAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        week = get_current_week()
        serializer = CurrentSemesterStatusSerializer    (week)
        return Response(serializer.data)
