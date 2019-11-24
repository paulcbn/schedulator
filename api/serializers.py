from typing import Dict

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers

from crawler.models import Subject, Section, Formation, TimetableEntry, Room, SubjectComponent


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')
        write_only_fields = ('username',)

    def validate(self, data):
        email = data.get('email', None)
        if email:
            data['username'] = email

        return data

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


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
        fields = ('sid', 'name', 'alias')


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


class BasicSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'name', 'year', 'type']


class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ['name', 'section_id', 'formation_type']


class InitiateUserSerializer(serializers.Serializer):
    formation_names = serializers.ListField(child=serializers.CharField(max_length=20), allow_empty=True)
    subject_ids = serializers.ListField(child=serializers.CharField(max_length=30), allow_empty=True)

    def update(self, instance, validated_data):
        return None

    def create(self, validated_data):
        pass


class SubjectComponentSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer()

    class Meta:
        model = SubjectComponent
        fields = ['subject', 'name', 'id']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['name', 'description']


class TimetableEntrySerializer(serializers.ModelSerializer):
    subject_component = SubjectComponentSerializer()
    room = RoomSerializer()
    formation = FormationSerializer()
    start_time = serializers.SerializerMethodField()
    end_time = serializers.SerializerMethodField()

    class Meta:
        model = TimetableEntry
        fields = [
            'id',
            'start_time',
            'end_time',
            'week_day',
            'frequency',
            'subject_component',
            'room',
            'formation',
            'teacher',
        ]

    def get_start_time(self, obj):
        return self.get_time(obj.start_time)

    def get_end_time(self, obj):
        return self.get_time(obj.end_time)

    def get_time(self, time):
        return time.hour * 3600 + time.minute * 60 + time.second
