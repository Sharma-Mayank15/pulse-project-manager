from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend


class CustomBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = get_user_model().objects.get(email=email)
            if user.check_password(password):
                return user
            return None  # Incorrect password
        except get_user_model().DoesNotExist:
            return None  # Email does not exist
