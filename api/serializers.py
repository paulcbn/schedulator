from typing import Dict

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

from crawler.models import Subject, Section


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name',)
        write_only_fields = ('username',)

    def validate(self, data):
        email = data.get('email', None)
        if email:
            data['username'] = email

        return data


class CreateUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()
    confirm_password = serializers.CharField()

    def validate_email(self, email):
        existing = User.objects.filter(email=email).first()
        if existing:
            raise serializers.ValidationError("Someone with that email "
                                              "address has already registered. Was it you?")

        return email

    def validate(self, data):
        if not data.get('password') or not data.get('confirm_password'):
            raise serializers.ValidationError("Please enter a password and "
                                              "confirm it.")

        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("The confirmation password does not match.")

        return data


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('sid', 'name')


class LoginUserSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data: Dict):
        user = authenticate(username=data.get("email"), password=data.get("password"))
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class DefaultSubjectsSerializer(serializers.ModelSerializer):
    default_subjects = SubjectSerializer(read_only=True, many=True)

    class Meta:
        model = Section
        fields = ['default_subjects', ]
