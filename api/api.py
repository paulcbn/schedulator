from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, generics
from rest_framework.response import Response

from knox.models import AuthToken
from rest_framework.views import APIView

from crawler.models import Subject
from .serializers import CreateUserSerializer, UserSerializer, LoginUserSerializer, SubjectSerializer


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
    authentication_classes = [TokenAuthentication,]

    def get_object(self):
        return self.request.user


class SubjectAPI(generics.ListAPIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()
