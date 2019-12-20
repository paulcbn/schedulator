from django.http import HttpResponseBadRequest
from django.utils import timezone
from knox.auth import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from api.exceptions import NoSemester
from api.models import Semester
from api.serializers.current_status_serializers import TimetableEntrySerializer
from api.serializers.enrollment_state_serializers import CreateAttendanceSerializer, CreateEnrollmentSerializer
from api.services.enrollment_state_service import add_entries_for_user, remove_attendance_from_user, \
    remove_enrollment_from_user, add_enrollments_for_user
from api.services.security_service import user_owns_entries, user_is_enrolled_to_subjects
from api.services.semester_calculation_service import get_school_week
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

    def post(self, request):
        user = request.user

        serializer = CreateAttendanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        entry_ids = serializer.validated_data['entry_ids']

        if user_owns_entries(user, entry_ids):
            return HttpResponseBadRequest("User already has that entry.")

        add_entries_for_user(user, entry_ids)
        return Response()

    def delete(self, request):
        user = request.user

        if 'entry_id' not in request.GET:
            return HttpResponseBadRequest("Entry id not supplied.")

        entry_id = request.GET['entry_id']
        remove_attendance_from_user(user, entry_id)

        return Response()


class OwnEnrollmentsListAPI(APIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def delete(self, request):
        user = request.user

        if 'subject_id' not in request.GET:
            return HttpResponseBadRequest("Subject id not supplied.")

        subject_id = request.GET['subject_id']
        remove_enrollment_from_user(user, subject_id)

        return Response()

    def post(self, request):
        user = request.user

        serializer = CreateEnrollmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        subject_id = serializer.validated_data['subject_id']

        if user_is_enrolled_to_subjects(user, [subject_id]):
            return HttpResponseBadRequest("User already is enrolled.")

        add_enrollments_for_user(user, [subject_id])
        return Response()


class CurrentWeekAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        try:
            last_semester = Semester.objects.order_by('-start_date').first()
            week = last_semester.weeks_past(timezone.now())
            week = get_school_week(week)
            return Response(week)
        except (ValueError, AttributeError, NoSemester):
            return Response(status=400)
