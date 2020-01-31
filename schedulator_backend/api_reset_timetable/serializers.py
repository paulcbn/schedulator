from rest_framework import serializers

from crawler.models import Subject, Section, Formation, TimetableEntry, Room, SubjectComponent


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('sid', 'name', 'alias')


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
