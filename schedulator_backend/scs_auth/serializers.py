import re

from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .service import validate_recaptcha


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField(label=_("Username"))
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False
    )
    captcha = serializers.CharField(default='', allow_blank=True)

    def validate_captcha(self, value):
        if not validate_recaptcha(value):
            raise serializers.ValidationError('Invalid captcha.')
        return value

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        username = re.sub("@scs[.]ubbcluj[.]ro", "", username)
        password = password.strip()
        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                msg = _('Unable to log in with provided credentials. (Also check scs availability)')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name',)
