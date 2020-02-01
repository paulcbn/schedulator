import logging

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from imapclient import IMAPClient
from imapclient.exceptions import LoginError

from . import settings

logger = logging.getLogger(__name__)


class ScsBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        client = IMAPClient(host=settings.IMAP_HOST)
        try:
            client.login(username, password)
            login_valid = True
            client.logout()
        except LoginError as exc:
            logger.error(f'Authentication failed for user "${username}" to the scs server: {exc}')
            login_valid = False

        if login_valid:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = User(username=username)
                if len(username) >= 2 and username[0].isalpha() and username[1].isalpha():
                    user.first_name = username[0].upper()
                    user.last_name = username[1].upper()

                user.save()
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
