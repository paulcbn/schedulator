from rest_framework import serializers

from api_core.models import StaticTable
from api_core.services.static_table_service import get_most_relevant_formation, get_search_id_for_subject, \
    get_search_id_for_teacher
from crawler.models import Section, Formation, TimetableEntry, Room, SubjectComponent, Subject


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('sid', 'name', 'alias')


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ['id', 'name', 'year', 'type']


class FormationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formation
        fields = ['name', 'section_id', 'formation_type']


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
        return self._get_time(obj.start_time)

    def get_end_time(self, obj):
        return self._get_time(obj.end_time)

    def _get_time(self, time):
        return time.hour * 3600 + time.minute * 60 + time.second


class StaticTableSerializer(serializers.ModelSerializer):
    attendances = TimetableEntrySerializer(many=True, read_only=True)
    most_relevant_formation = serializers.SerializerMethodField(read_only=True)
    section = SectionSerializer()
    subject = SubjectSerializer()

    class Meta:
        model = StaticTable
        fields = [
            'attendances',
            'section',
            'teacher',
            'subject',
            'most_relevant_formation',
        ]

    def get_most_relevant_formation(self, static_table):
        if static_table.section is None:
            return None

        formation = get_most_relevant_formation(static_table)
        serializer = FormationSerializer(formation)
        return serializer.data


class RecursiveField(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class StaticTableHierarchySerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    formation = FormationSerializer()
    search_id = serializers.CharField(allow_null=True)
    children = RecursiveField(many=True)


class SearchSubjectSerializer(serializers.ModelSerializer):
    section_set = SectionSerializer(many=True)
    search_id = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = ['sid', 'name', 'section_set', 'search_id']

    def get_search_id(self, subject):
        return get_search_id_for_subject(subject)


class SubjectPageSerializer(serializers.Serializer):
    current_page = serializers.IntegerField(min_value=1)
    page_count = serializers.IntegerField(min_value=1)
    subjects = SearchSubjectSerializer(many=True)


class TeacherSerializer(serializers.Serializer):
    name = serializers.SerializerMethodField()
    search_id = serializers.SerializerMethodField()

    def get_search_id(self, teacher):
        return get_search_id_for_teacher(teacher)

    def get_name(self, teacher):
        return teacher


class TeacherPageSerializer(serializers.Serializer):
    current_page = serializers.IntegerField(min_value=1)
    page_count = serializers.IntegerField(min_value=1)
    teachers = TeacherSerializer(many=True)
