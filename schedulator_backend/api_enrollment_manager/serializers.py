from rest_framework import serializers

from crawler.models import Subject, SubjectComponent, TimetableEntry, Formation, Room, Section


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'name', 'year', 'type']


class FormationSerializer(serializers.ModelSerializer):
    section = SectionSerializer()

    class Meta:
        model = Formation
        fields = ['name', 'section', 'formation_type']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['name', 'description']


class TimetableEntrySerializer(serializers.ModelSerializer):
    room = RoomSerializer()
    formation = FormationSerializer()

    class Meta:
        model = TimetableEntry
        fields = [
            'id',
            'start_time',
            'end_time',
            'week_day',
            'frequency',
            'room',
            'formation',
            'teacher',
        ]


class TimetableEntryWithSectionSerializer(serializers.ModelSerializer):
    room = RoomSerializer()
    formation = FormationSerializer()

    class Meta:
        model = TimetableEntry
        fields = [
            'id',
            'start_time',
            'end_time',
            'week_day',
            'frequency',
            'room',
            'formation',
            'teacher',
        ]


class SubjectComponentWithEntriesSerializer(serializers.ModelSerializer):
    entries = TimetableEntrySerializer(many=True, source='own_entries', read_only=True)

    class Meta:
        model = SubjectComponent
        fields = ['name', 'entries', 'id']


class EnrolledSubjectSerializer(serializers.ModelSerializer):
    components = SubjectComponentWithEntriesSerializer(many=True, source='subjectcomponent_set', read_only=True)
    sections = SectionSerializer(many=True, source='section_set', read_only=True)

    class Meta:
        model = Subject
        fields = ['sid', 'name', 'alias', 'components', 'sections']


class SimpleSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['name']


class SimpleSubjectComponentSerializer(serializers.ModelSerializer):
    subject = SimpleSubjectSerializer()

    class Meta:
        model = SubjectComponent
        fields = ['name', 'id', 'subject']


class SubjectComponentStateSerializer(serializers.Serializer):
    owned = TimetableEntryWithSectionSerializer(many=True, read_only=True)
    not_owned = TimetableEntryWithSectionSerializer(many=True, read_only=True)
    subject_component = SimpleSubjectComponentSerializer(read_only=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass


class CreateAttendanceSerializer(serializers.Serializer):
    entry_ids = serializers.ListField(child=serializers.IntegerField())


class CreateEnrollmentSerializer(serializers.Serializer):
    subject_id = serializers.CharField()


class CompleteSubjectSerializer(serializers.ModelSerializer):
    section_set = SectionSerializer(many=True)

    class Meta:
        model = Subject
        fields = ['sid', 'name', 'section_set', ]


class SubjectPageSerializer(serializers.Serializer):
    current_page = serializers.IntegerField(min_value=1)
    page_count = serializers.IntegerField(min_value=1)
    subjects = CompleteSubjectSerializer(many=True)
