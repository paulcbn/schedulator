from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from api.serializers.auth_serializers import RegisterFormSerializer, CreateUserSerializer, LoginUserSerializer, \
    GetUserSerializer
from api.services.recaptcha_service import validate_recaptcha


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
