from django.utils import timezone

from api.exceptions import NoSemester
from api.models import Vacation, Semester


def is_vacation_week(week):
    """
    :param week: small integer
    :return: True if the week is valid and vacation week else False
    """
    try:
        semester = Semester.objects.order_by('-start_date').first()
        if week < 1:
            return False

        if week > semester.weeks:
            return False
    except AttributeError:
        raise NoSemester("The semester doesn't start yet")
    vacations = Vacation.objects.all()
    result = False
    for vacation in vacations:
        if vacation.start_week <= week < vacation.end_week:
            result = True
    return result


def get_vacation(current_week):
    for vacation in Vacation.objects.all():
        if vacation.start_week <= current_week <= vacation.end_week:
            return vacation
    return None


def get_school_week(current_week):
    """
    :param current_week: small integer
    """
    try:
        current_semester = Semester.objects.order_by('-start_date').first()
        current_vacation = get_vacation(current_week)
        if current_vacation:
            current_week = current_vacation.start_week - 1
        vacations = Vacation.objects.filter(semester=current_semester).filter(end_week__lte=current_week)
        for vacation in vacations:
            current_week -= len(vacation)

        if current_week < 1:
            return 1
        if current_week > current_semester.weeks:
            return current_semester.weeks
        return current_week
    except AttributeError:
        raise NoSemester('No semester found')


def get_next_week_delta(actual_week):
    next_actual_week = actual_week + 1
    next_week_vacation = get_vacation(next_actual_week)
    if next_week_vacation is None:
        return next_actual_week - actual_week

    return next_week_vacation.end_week + 1 - actual_week


def get_week_for_date(date):
    last_semester = Semester.objects.order_by('-start_date').first()
    actual_week = last_semester.weeks_past(date)
    return get_school_week(actual_week)


def get_current_week():
    last_semester = Semester.objects.order_by('-start_date').first()
    actual_week = last_semester.weeks_past(timezone.now())
    semester_week = get_school_week(actual_week)
    vacation = get_vacation(actual_week)
    next_week_delta = get_next_week_delta(actual_week)

    result = {
        'week': semester_week,
        'is_vacation': vacation is not None,
        'next_week_delta': next_week_delta
    }

    return result
