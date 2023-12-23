from django.shortcuts import render, redirect

# Create your views here.
from django.contrib.auth import login, authenticate, logout, get_user_model
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView
from django.views.generic.edit import CreateView
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

class ReservationView(CreateView):
    model = Reservation
    form_class = ReservationForm
    template_name = "online.html"
    success_url = reverse_lazy('list')

    def get_initial(self):
        initial = super().get_initial()
        initial['session_code'] = self.kwargs.get('session_id')
        return initial

    def form_valid(self, form):
        form.instance.guest_ID = self.request.user
        return super().form_valid(form)

class ReservationListView(LoginRequiredMixin, ListView):
    model = Reservation
    template_name = 'list.html'
    context_object_name = 'reservations'

    def get_queryset(self):
        return Reservation.objects.filter(guest_ID=self.request.user).order_by('-booked_on')

def online_view(request):
    sessions = YogaSession.objects.filter(session_type='online')
    return render(request, 'online.html', {'sessions': sessions})

def offline_view(request):
    sessions = YogaSession.objects.filter(session_type='offline')
    return render(request, 'offline.html', {'sessions': sessions})

User = get_user_model()

def login_view(request):
    form = LoginForm()
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(request, username=email, password=password)
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

