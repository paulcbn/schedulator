from knox.auth import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from api.serializers.enrollment_state_serializers import EnrolledSubjectSerializer, SubjectComponentStateSerializer
from api.services.enrollment_state_service import get_enrolled_for_user, get_entries_for_subject_component


class EnrollmentStateAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = request.user
        result = get_enrolled_for_user(user)
        serializer = EnrolledSubjectSerializer(result, many=True, read_only=True)
        return Response(serializer.data)


class SubjectComponentStateAPI(generics.GenericAPIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, subject_component_id):
        user = request.user
        result = get_entries_for_subject_component(user, subject_component_id)
        serializer = SubjectComponentStateSerializer(result, read_only=True)
        return Response(serializer.data)
