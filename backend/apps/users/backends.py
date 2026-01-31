from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()

class EmailOrPhoneAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            return None

        try:
            if '@' in username:
                # Recherche insensible à la casse avec __iexact
                user = User.objects.get(email__iexact=username.strip())
            else:
                user = User.objects.get(phone=username.strip())
        except User.DoesNotExist:
            return None

        if user.check_password(password):
            return user
        return None