from django.contrib.auth.forms import UserCreationForm
from django import forms

from .models import *

from django.forms import ModelForm

class RegistrationGuestForm(UserCreationForm):
    email = forms.EmailField(required=True)
    birth_date = forms.DateField(help_text="Формат: YYYY-MM-DD", required=False)
    phone = forms.CharField(max_length=12, help_text="+380", required=False)

    class Meta:
        model = Guest
        fields = ['first_name', 'last_name', 'email', 'birth_date', 'phone', 'password1', 'password2']

    def __init__(self, *args, **kwargs):
        super(RegistrationGuestForm, self).__init__(*args, **kwargs)
        self.fields['first_name'].label = "Ім'я"
        self.fields['last_name'].label = "Прізвище"
        self.fields['email'].label = "Електронна пошта"
        self.fields['birth_date'].label = "Дата народження"
        self.fields['phone'].label = "Телефон"
        self.fields['password1'].label = "Пароль"
        self.fields['password2'].label = "Підтвердження паролю"


class LoginForm(forms.Form):
    email = forms.EmailField(required=True)
    password = forms.CharField(max_length=63, widget=forms.PasswordInput)

class ReservationForm(ModelForm):
    class Meta:
        model = Reservation
        fields = ["guest_ID", "session_code", "status"]

    def __init__(self, *args, **kwargs):
        super(ReservationForm, self).__init__(*args, **kwargs)
        self.fields['session_code'].queryset = YogaSession.objects.all()

class ContactForm(forms.Form):
    contact_name = forms.CharField(required=True)
    contact_email = forms.EmailField(required=True)
    content = forms.CharField(
        required=True,
        widget=forms.Textarea)

    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields['contact_name'].label = "@TODO Your name:"
        self.fields['contact_email'].label = "@TODO Your email:"
        self.fields['content'].label = "@TODO What do you want to say?"