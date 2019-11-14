from django.http import HttpResponseBadRequest
from django.shortcuts import get_object_or_404, get_list_or_404
from django.utils.datastructures import MultiValueDictKeyError
from django.views import generic
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

from crawler.models import Subject, Section, Formation
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer, SubjectSerializer, \
    DefaultSubjectsSerializer, BasicSectionSerializer, FormationSerializer


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        # Validating our serializer from the UserRegistrationSerializer
        serializer = CreateUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Everything's valid, so send it to the UserSerializer
        model_serializer = UserSerializer(data=serializer.data)
        model_serializer.is_valid(raise_exception=True)
        user = model_serializer.save()

        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = UserSerializer
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
        return Response(serializer.data)


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
            if "section_id" in request.GET:
                formations = Formation.objects.filter(section_id=request.GET["section_id"])
            else:
                formations = Formation.objects.all()
            serializer = FormationSerializer(formations, many=True)
            return Response(serializer.data)
        except (ValueError, OverflowError):
            return HttpResponseBadRequest("Bad request")
