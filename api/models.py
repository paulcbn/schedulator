import datetime

import pytz
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.timezone import localdate
from requests import Response

from crawler.models import TimetableEntry, Subject


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    attendance_choices = models.ManyToManyField(to=TimetableEntry)
    enrolled_subjects = models.ManyToManyField(to=Subject)

    def __str__(self):
        return self.user.__str__()


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

    def __str__(self):
        return f"Semester {self.name}"

    def weeks_past(self, date):
        calculated_start_date = self.start_date - datetime.timedelta(self.start_date.weekday())
        delta = date - calculated_start_date
        return delta.days // 7 + 1
