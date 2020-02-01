from django.core.management import BaseCommand

from crawler.models import Subject


class Command(BaseCommand):
    help = 'Make aliases for subjects'

    @staticmethod
    def remove_part_after(sequence: str, string: str) -> str:
        try:
            index = string.index(sequence)
            return string[:index]
        except ValueError:
            return string

    def handle(self, *args, **options):
        link_words = ["pe", "de", "si", "a", "ale", "ai", "cu", "pentru", "in", "I", "II", "III"]
        subjects = Subject.objects.all()
        for subject in subjects:
            alias = ""
            raw_subject = self.remove_part_after('(', subject.name)
            raw_subject = self.remove_part_after('/', raw_subject)
            raw_subject = self.remove_part_after('.', raw_subject)
            raw_words = raw_subject.split()
            for word in raw_words:
                if word not in link_words:
                    if word.upper() == word:
                        alias += word
                    else:
                        minus_delimited = word.upper().split('-')
                        for final_word in minus_delimited:
                            alias += final_word[0]
            if len(alias) == 1:
                alias = subject.name.upper()[:5]
            subject.alias = alias
            subject.save()
