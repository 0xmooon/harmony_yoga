from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.views.generic.edit import CreateView
from django.views.generic.list import ListView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login, authenticate, logout
from .models import Guest, Club, YogaSession, Reservation
from .forms import LoginForm, RegistrationGuestForm, ReservationForm, ContactForm

def home_view(request):
    return render(request, 'home.html', {})

def about_view(request):
    return render(request, 'about.html', {})

def faq_view(request):
    return render(request, 'faq.html', {})

def portfolio_view(request):
    return render(request, 'portfolio.html', {})

def online_view(request):
    sessions = YogaSession.objects.filter(session_type='online')
    return render(request, 'online.html', {'sessions': sessions})

def offline_view(request):
    sessions = YogaSession.objects.filter(session_type='offline')
    return render(request, 'offline.html', {'sessions': sessions})

def login_view(request):
    form = LoginForm()
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(email=form.cleaned_data['email'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                form.add_error(None, "Помилка входу в систему")
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('home')

def register_view(request):
    if request.method == "POST":
        form = RegistrationGuestForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = RegistrationGuestForm()
    return render(request, 'register.html', {'form': form})

def contact_view(request):
    if request.method == 'GET':
        form = ContactForm()
    else:
        form = ContactForm(request.POST)
        if form.is_valid():
            # @TODO сенд емаил
            return redirect('home')
    return render(request, "contact.html", {'form': form})

