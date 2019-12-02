from django.http import HttpResponseBadRequest, HttpResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from api.exceptions import NoSemester
from api.models import Semester
from api.models import StaticTable
from api.serializers.current_state_serializers import DefaultSubjectsSerializer, FormationSerializer, \
    InitiateUserSerializer, TimetableEntrySerializer, BasicSectionSerializer, SubjectSerializer
from api.serializers.auth_serializers import RegisterFormSerializer, CreateUserSerializer, LoginUserSerializer, \
    GetUserSerializer
from api.serializers.static_tables_serializers import StaticTableSerializer, StaticTableHierarchySerializer
from api.services.initial_setup_service import InitialSetupService
from api.services.recaptcha_service import validate_recaptcha
from api.services.static_table_service import get_static_tables_hierarchy
from api.utils import get_school_week
from crawler.models import Subject, Section, Formation, TimetableEntry


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = RegisterFormSerializer

    def post(self, request, *args, **kwargs):
        if not validate_recaptcha(request.data.get('captcha', '')):
            return Response(data={'captcha': 'Invalid captcha'}, status=HTTP_400_BAD_REQUEST)

        # Validating our serializer from the UserRegistrationSerializer
        serializer = RegisterFormSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Everything's valid, so send it to the UserSerializer
        model_serializer = CreateUserSerializer(data=serializer.validated_data, write_only=True)
        model_serializer.is_valid(raise_exception=True)
        user = model_serializer.save()

        _, token = AuthToken.objects.create(user)
        return Response({
            "user": CreateUserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        if not validate_recaptcha(request.data.get('captcha', '')):
            return Response(data={'captcha': 'Invalid captcha'}, status=HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": CreateUserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = GetUserSerializer
    authentication_classes = [TokenAuthentication, ]

    def get_object(self):
        return self.request.user


class SubjectAPI(generics.ListAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()


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
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
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


class OwnAttendanceAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request, *args, **kwargs):
        user = request.user
        result = TimetableEntry.objects.filter(userprofile__user=user)
        serializer = TimetableEntrySerializer(result, many=True, read_only=True)
        return Response(serializer.data)


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


class StaticTableAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        if 'search_id' in request.GET:
            result = StaticTable.objects.filter(search_id=request.GET['search_id'])
            if len(result) == 1:
                serializer = StaticTableSerializer(result[0])
                return Response(serializer.data)
        return Response([])


class StaticTableHierarchyAPI(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, ]

    def get(self, request, *args, **kwargs):
        if 'section_id' in request.GET:
            hierarchy = get_static_tables_hierarchy(request.GET['section_id'])
            serializer = StaticTableHierarchySerializer(hierarchy)
            return Response(serializer.data)
        return Response(status=400)
