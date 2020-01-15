from knox.auth import TokenAuthentication
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.serializers.custom_entries_serializers import CreatePersonalTableEntrySerializer, \
    ListPersonalTableEntrySerializer


class PersonalTableEntryListCreateAPI(generics.ListCreateAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = CreatePersonalTableEntrySerializer

    def perform_create(self, serializer):
        if self.request.user.user_profile.personaltableentry_set.count() >= 15:
            raise Exception('Already achieved limit.')
        serializer.save(user_profile=self.request.user.user_profile)

    def get_queryset(self):
        user_profile = self.request.user.user_profile
        return user_profile.personaltableentry_set.all()

    def get(self, request, *args, **kwargs):
        user_profile = self.request.user.user_profile
        query_set = user_profile.personaltableentry_set.all()
        serializer = ListPersonalTableEntrySerializer(query_set, many=True)

        return Response(serializer.data)


class PersonalTableEntryDestroyAPI(generics.DestroyAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = CreatePersonalTableEntrySerializer

    def get_queryset(self):
        user_profile = self.request.user.user_profile
        return user_profile.personaltableentry_set.all()
