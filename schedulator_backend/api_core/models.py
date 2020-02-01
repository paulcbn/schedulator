import datetime

from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from crawler.models import TimetableEntry, Subject, Section, Formation


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    attendance_choices = models.ManyToManyField(to=TimetableEntry)
    enrolled_subjects = models.ManyToManyField(to=Subject)

    def __str__(self):
        return str(self.user)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.user_profile.save()


class Semester(models.Model):
    start_date = models.DateTimeField(null=False)
    name = models.CharField(max_length=100, null=False)
    weeks = models.SmallIntegerField(default=14)

    def __str__(self):
        return f"Semester {self.name}"

    def weeks_past(self, date):
        delta = date - self.start_date
        return delta.days // 7 + 1


class Vacation(models.Model):
    start_week = models.SmallIntegerField()
    end_week = models.SmallIntegerField()
    name = models.CharField(max_length=100, null=True)
    semester = models.ForeignKey(to=Semester, on_delete=models.CASCADE)

    def __len__(self):
        return self.end_week - self.start_week + 1


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
