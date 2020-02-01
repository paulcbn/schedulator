from django.db import models

from api_core.models import UserProfile


class CustomTimetableEntry(models.Model):
    MONDAY = 'Mo'
    TUESDAY = 'Tu'
    WEDNESDAY = 'We'
    THURSDAY = 'Th'
    FRIDAY = 'Fr'
    SATURDAY = 'Sa'
    SUNDAY = 'Su'

    DAY_NAME = (
        (MONDAY, 'Luni'),
        (TUESDAY, 'Marti'),
        (WEDNESDAY, 'Miercuri'),
        (THURSDAY, 'Joi'),
        (FRIDAY, 'Vineri'),
        (SATURDAY, 'Sambata'),
        (SUNDAY, 'Duminica'),
    )

    ALL_WEEKS = 'all'
    ODD_WEEKS = 'odd'
    EVEN_WEEKS = 'evn'

    FREQUENCY_TYPE = (
        (ALL_WEEKS, ''),
        (ODD_WEEKS, 'sapt. 1'),
        (EVEN_WEEKS, 'sapt. 2'),
    )

    week_day = models.CharField(max_length=2, choices=DAY_NAME)
    start_time = models.TimeField()
    end_time = models.TimeField()
    frequency = models.CharField(choices=FREQUENCY_TYPE, max_length=3)
    room_name = models.CharField(max_length=200, blank=True)
    subject_component_name = models.CharField(max_length=200)
    subject_name = models.CharField(max_length=200)
    formation_name = models.CharField(max_length=200, blank=True)
    teacher = models.CharField(max_length=200, blank=True)

    user_profile = models.ForeignKey(to=UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.subject_component_name} - {self.formation_name} - {self.start_time} - {self.week_day} - {self.room_name}"
