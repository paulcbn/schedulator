from rest_framework import serializers

from crawler.models import Subject, Section, Formation, TimetableEntry, Room, SubjectComponent


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('sid', 'name', 'alias')


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
    formation = FormationSerializer()
    room = RoomSerializer()
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
