# Generated by Django 4.2.7 on 2024-03-06 09:40

import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Club',
            fields=[
                ('club_code', models.BigAutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=150)),
                ('phone', models.CharField(max_length=12)),
                ('email', models.EmailField(blank=True, max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Guest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('birth_date', models.DateField(null=True)),
                ('phone', models.CharField(help_text='+380', max_length=12, null=True)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='@TODO email address')),
                ('groups', models.ManyToManyField(blank=True, related_name='guest_user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='guest_user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': '@TODO Guest List',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='YogaSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_type', models.CharField(choices=[('individual', 'Individual session'), ('group', 'Group session')], default='group', max_length=200)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('session_code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.club')),
            ],
            options={
                'verbose_name': '@TODO Yoga Session',
            },
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('reservation_num', models.BigAutoField(primary_key=True, serialize=False, unique=True)),
                ('booked_on', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('booked', 'Booked'), ('cancelled', 'Cancelled')], default='booked', max_length=50)),
                ('guest_ID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.guest')),
                ('session_code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.yogasession')),
            ],
            options={
                'verbose_name': '@TODO reservation List',
            },
        ),
    ]