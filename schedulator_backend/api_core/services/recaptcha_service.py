import requests

from schedulator_backend.settings import GOOGLE_RECAPTCHA_SECRET_KEY


def validate_recaptcha(captcha: str):
    if GOOGLE_RECAPTCHA_SECRET_KEY == '':
        return True
    try:
        r = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': GOOGLE_RECAPTCHA_SECRET_KEY,
                'response': captcha
            }
        )

        return r.json().get('success', False)
    except Exception:
        return False
