from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from api_current_timetable.serializers import TimetableEntrySerializer
from crawler.models import TimetableEntry


class OwnAttendancesListAPI(APIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        result = TimetableEntry.objects.filter(userprofile__user=user)
        serializer = TimetableEntrySerializer(result, many=True, read_only=True)
        return Response(serializer.data)
