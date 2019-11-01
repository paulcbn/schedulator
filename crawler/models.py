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
    name = models.CharField(max_length=20, primary_key=True)
    section = models.ForeignKey(to=Section, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'


class Room(models.Model):
    name = models.CharField(max_length=30, primary_key=True)
    description = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.name}'


class TimetableEntry(models.Model):
    class Meta:
        unique_together = (
            ('formation', 'subject_component', 'room', 'start_time', 'end_time', 'frequency', 'week_day'),
        )

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
    room = models.ForeignKey(to=Room, on_delete=models.CASCADE)
    subject_component = models.ForeignKey(to=SubjectComponent, on_delete=models.CASCADE)
    formation = models.ForeignKey(to=Formation, on_delete=models.CASCADE)
    teacher = models.CharField(max_length=200)  # TODO this should be a model of its own in the future
