from django.db import models


class Subject(models.Model):
    sid = models.CharField(max_length=30, primary_key=True)
    name = models.CharField(max_length=200)
    url = models.CharField(max_length=100, default='')

    def __str__(self):
        return f'{self.name}'


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
    url = models.CharField(max_length=100, default='')

    default_subjects = models.ManyToManyField(Subject)

    def __str__(self):
        return f'{self.name}'


class SubjectComponent(models.Model):
    class Meta:
        unique_together = (('name', 'subject'),)

    name = models.CharField(max_length=200)
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.subject} - {self.name}'


class Formation(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    section = models.ForeignKey(to=Section, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'
