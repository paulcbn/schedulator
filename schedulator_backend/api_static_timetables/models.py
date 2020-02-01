from django.db import models

from crawler.models import TimetableEntry, Section, Formation, Subject


class StaticTable(models.Model):
    attendances = models.ManyToManyField(to=TimetableEntry)
    search_id = models.CharField(max_length=200, unique=True, null=False)

    # Fields for formation type static table
    section = models.ForeignKey(to=Section, on_delete=models.CASCADE, null=True)
    formations = models.ManyToManyField(to=Formation)

    # Fields for teacher static table
    teacher = models.CharField(max_length=200, null=True)

    # Fields for subject static table
    subject = models.ForeignKey(to=Subject, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.search_id
