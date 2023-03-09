from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm, UserCreationForm

User = get_user_model()


class UserAdminCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('college_id', 'password')
        field_classes = {}


class UserAdminChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = '__all__'
        field_classes = {}

