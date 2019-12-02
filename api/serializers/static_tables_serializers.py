from rest_framework import serializers

from api.models import StaticTable
from api.serializers.current_state_serializers import TimetableEntrySerializer, FormationSerializer
from api.services.static_table_service import get_most_relevant_formation
from api.serializers.current_state_serializers import BasicSectionSerializer


class StaticTableSerializer(serializers.ModelSerializer):
    attendances = TimetableEntrySerializer(many=True, read_only=True)
    most_relevant_formation = serializers.SerializerMethodField(read_only=True)
    section = BasicSectionSerializer()

    class Meta:
        model = StaticTable
        fields = [
            'attendances',
            'section',
            'most_relevant_formation',
        ]

    def get_most_relevant_formation(self, static_table):
        formation = get_most_relevant_formation(static_table)
        serializer = FormationSerializer(formation)
        return serializer.data


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class StaticTableHierarchySerializer(serializers.Serializer):
    formation = FormationSerializer()
    search_id = serializers.CharField(allow_null=True)
    children = RecursiveField(many=True)
