from django.db import models


class Subject(models.Model):
    sid = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.sid}: {self.name}'


class Section(models.Model):
    class Meta:
        unique_together = (('name', 'year'),)

    SECTION_TYPE = (
        ('M', 'Master'),
        ('B', 'Bachelor'),
    )

    name = models.CharField(max_length=200)
    year = models.CharField(max_length=20)
    type = models.CharField(max_length=1, choices=SECTION_TYPE, default='B')

    default_subjects = models.ManyToManyField(Subject)

    def __str__(self):
        return f'{self.name} - {self.year}'
