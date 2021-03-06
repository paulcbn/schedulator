from django.http import HttpResponseBadRequest
from knox.auth import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from api_core.services.security_service import user_is_enrolled_to_subjects, user_owns_entries
from .serializers import EnrolledSubjectSerializer, SubjectComponentStateSerializer, \
    CreateEnrollmentSerializer, SubjectPageSerializer, CreateAttendanceSerializer
from .service import get_enrolled_for_user, get_entries_for_subject_component, \
    remove_enrollment_from_user, add_enrollments_for_user, search_not_owned_subjects_paged, add_entries_for_user, \
    remove_attendance_from_user


class OwnEnrollmentStateRetrieveAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = request.user
        result = get_enrolled_for_user(user)
        serializer = EnrolledSubjectSerializer(result, many=True, read_only=True)
        return Response(serializer.data)


class OwnAttendancesCreateDestroyAPI(APIView):
    renderer_classes = [JSONRenderer, ]
    permission_classes = [IsAuthenticated, ]

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


class OwnEnrollmentCreateDestroyAPI(APIView):
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


class NotOwnedSubjectRetrieveAPI(APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        if 'search_string' in request.GET:
            page_index = request.GET.get('page', 1)
            search_result = search_not_owned_subjects_paged(request.user, request.GET['search_string'], page_index)
        else:
            search_result = search_not_owned_subjects_paged(request.user, '', 1)

        serializer = SubjectPageSerializer(search_result)
        return Response(serializer.data)


class SubjectComponentStateRetrieveAPI(generics.GenericAPIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, subject_component_id):
        user = request.user
        result = get_entries_for_subject_component(user, subject_component_id)
        serializer = SubjectComponentStateSerializer(result, read_only=True)
        return Response(serializer.data)
