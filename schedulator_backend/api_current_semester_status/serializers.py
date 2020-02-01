from rest_framework import serializers


class CurrentSemesterStatusSerializer(serializers.Serializer):
    week = serializers.IntegerField(min_value=1)
    is_vacation = serializers.BooleanField()
    next_week_delta = serializers.IntegerField(min_value=1)
