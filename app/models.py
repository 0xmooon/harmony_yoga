from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Необхідно встановити Email')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_admin(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Адміністратор повинен мати is_staff=True.')
        if extra_fields.get('is_admin') is not True:
            raise ValueError('Адміністратор повинен мати is_admin=True.')
        return self.create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, password, **extra_fields)

class Guest(AbstractUser):
    objects = CustomUserManager()
    birth_date = models.DateField(null=True)
    phone = models.CharField(max_length=12, help_text="+380", null=True)
    email = models.EmailField('email address', unique=True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name="guest_user_set",
        related_query_name="user",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name="guest_user_set",
        related_query_name="user",
    )

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'Список гостей'

class Club(models.Model):
    club_code = models.BigAutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=150)
    phone = models.CharField(max_length=12)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.name



class YogaSession(models.Model):
    SESSION_TYPES = [
        ('online', 'Онлайн-сесія'),
        ('offline', 'Офлайн-сесія'),
    ]

    session_code = models.ForeignKey(Club, on_delete=models.CASCADE)
    session_type = models.CharField(max_length=200, choices=SESSION_TYPES, default='group')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return f"{self.get_session_type_display()} session at {self.start_time.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        verbose_name = 'Заняття з йоги'

class Reservation(models.Model):
    reservation_num = models.BigAutoField(primary_key=True, unique=True)
    guest_ID = models.ForeignKey(Guest, on_delete=models.CASCADE)
    session_code = models.ForeignKey(YogaSession, on_delete=models.CASCADE)

    booked_on = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('booked', 'Заброньовано'), ('cancelled', 'Скасовано')], default='booked')

    def __str__(self):
        return f"Reservation {self.reservation_num} by {self.guest_ID.email}"

    class Meta:
        verbose_name = 'Список бронювання'