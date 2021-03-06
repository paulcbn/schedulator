from rest_framework import serializers

from .models import CustomTimetableEntry


class CreateCustomTimetableEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomTimetableEntry
        fields = '__all__'
        read_only_fields = ['id', 'user_profile']

    def validate_subject_component_name(self, value):
        if value not in ('Laborator', 'Seminar', 'Curs'):
            raise serializers.ValidationError("Not valid")
        return value


class ListCustomTimetableEntrySerializer(serializers.ModelSerializer):
    start_time = serializers.SerializerMethodField()
    end_time = serializers.SerializerMethodField()

    class Meta:
        model = CustomTimetableEntry
        fields = '__all__'

    def get_start_time(self, obj):
        return self._get_time(obj.start_time)

    def get_end_time(self, obj):
        return self._get_time(obj.end_time)

    def _get_time(self, time):
        return time.hour * 3600 + time.minute * 60 + time.second
