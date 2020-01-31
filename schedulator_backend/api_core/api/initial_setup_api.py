from django.http import HttpResponseBadRequest, HttpResponse
from knox.auth import TokenAuthentication
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from api_core.serializers.initial_setup_serializers import DefaultSubjectsSerializer, FormationSerializer, \
    InitiateUserSerializer, BasicSectionSerializer, SubjectSerializer
from api_core.services.initial_setup_service import InitialSetupService
from crawler.models import Subject, Section, Formation


class SubjectAPI(APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        query_set = Subject.objects.all()
        serializer = SubjectSerializer(query_set, many=True)
        return Response(serializer.data)


class DefaultSubjectsAPI(APIView):
    renderer_classes = [JSONRenderer, ]

    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, pk):
        section = get_object_or_404(Section, pk=pk)
        serializer = DefaultSubjectsSerializer(section)
        return Response(serializer.data['default_subjects'])


class SectionAPI(generics.ListAPIView):
    renderer_classes = [JSONRenderer, ]
    # authentication_classes = [TokenAuthentication, ]
    # permission_classes = [IsAuthenticated, ]
    serializer_class = BasicSectionSerializer
    queryset = Section.objects.all()


class FormationAPI(APIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            filters = {}
            if "section_id" in request.GET:
                filters["section_id"] = request.GET["section_id"]

            formations = Formation.objects.filter(**filters)
            serializer = FormationSerializer(formations, many=True)
            return Response(serializer.data)
        except (ValueError, OverflowError):
            return HttpResponseBadRequest("Bad request")


class InitiateUserAPI(generics.GenericAPIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request, *args, **kwargs):
        serializer = InitiateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subject_ids = serializer.validated_data['subject_ids']
        formation_names = serializer.validated_data['formation_names']
        user_initiate_service = InitialSetupService(request.user)
        user_initiate_service.initiate(subject_ids, formation_names)
        return HttpResponse(status=200)
