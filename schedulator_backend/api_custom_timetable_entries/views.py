from knox.auth import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import CreateCustomTimetableEntrySerializer, ListCustomTimetableEntrySerializer


class CustomTimetableEntryListCreateAPI(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = CreateCustomTimetableEntrySerializer

    def perform_create(self, serializer):
        if self.request.user.user_profile.customtimetableentry_set.count() >= 15:
            raise Exception('Already achieved limit.')
        serializer.save(user_profile=self.request.user.user_profile)

    def get_queryset(self):
        user_profile = self.request.user.user_profile
        return user_profile.customtimetableentry_set.all()

    def get(self, request, *args, **kwargs):
        user_profile = self.request.user.user_profile
        query_set = user_profile.customtimetableentry_set.all()
        serializer = ListCustomTimetableEntrySerializer(query_set, many=True)

        return Response(serializer.data)


class CustomTimetableEntryDestroyAPI(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = CreateCustomTimetableEntrySerializer

    def get_queryset(self):
        user_profile = self.request.user.user_profile
        return user_profile.customtimetableentry_set.all()
