import logging
import ssl
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from imapclient import IMAPClient
from imapclient.exceptions import LoginError

from schedulator_backend.settings import USE_EMAIL_AUTH_SSL
from scs_auth.exceptions import ScsAuthException, InvalidUniversitySSL
from . import settings

logger = logging.getLogger(__name__)


def get_ssl_context():
    if USE_EMAIL_AUTH_SSL:
        return None  # this means the imapclient will use the default ssl options
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx


def create_scs_client():
    try:
        return IMAPClient(
            host=settings.IMAP_HOST,
            ssl_context=get_ssl_context()
        )
    except ssl.SSLCertVerificationError as exc:
        logger.error(f'SSL fail to the scs server: {exc}')
        raise InvalidUniversitySSL()


def login_to_scs(mail_client, username, password):
    try:
        mail_client.login(username, password)
        return True
    except LoginError as exc:
        logger.error(f'Authentication failed for user "${username}" to the scs server: {exc}')
        return False


def destroy_scs_client(mail_client):
    try:
        mail_client.logout()
    except Exception as exc:
        logger.error(f'Failed to destroy client "{mail_client}": {exc}')


def check_scs_credentials(username, password):
    try:
        mail_client = create_scs_client()
        login_to_scs(mail_client, username, password)
        destroy_scs_client(mail_client)
        return True
    except ScsAuthException:
        return False


def create_new_user(username):
    user = User(username=username)
    if len(username) >= 1 and username[0].isalpha():
        user.first_name = username[0].upper()

    if len(username) >= 2 and username[1].isalpha():
        user.last_name = username[1].upper()

    user.save()
    return user


class ScsBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        if check_scs_credentials(username, password):
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = create_new_user(username)
            return user

        else:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
