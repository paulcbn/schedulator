from django.http import HttpResponse
from knox.auth import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.services.export_timetable_service import generate_export


class ExportTimetableApi(generics.RetrieveAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = request.user
        text = generate_export(user)

        response = HttpResponse(text, content_type='text/plain; charset=UTF-8')
        response['Content-Disposition'] = 'attachment; filename=schedulator-export.xml'
        return response
