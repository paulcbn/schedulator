from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from api_core.serializers.current_week_serializers import CurrentWeekSerializer
from api_core.services.current_week_service import get_current_week


class CurrentWeekAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        week = get_current_week()
        serializer = CurrentWeekSerializer(week)
        return Response(serializer.data)
