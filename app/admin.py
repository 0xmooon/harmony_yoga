from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Guest, Club, YogaSession, Reservation

class GuestAdmin(BaseUserAdmin):
    model = Guest
    list_display = ('email', 'phone', 'birth_date', 'is_active', 'date_joined')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'birth_date', 'phone')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'birth_date', 'phone', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)

class ClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'phone', 'email')

class YogaSessionAdmin(admin.ModelAdmin):
    list_display = ('session_code', 'session_type', 'start_time', 'end_time')
    list_filter = ('session_type',)

class ReservationAdmin(admin.ModelAdmin):
    list_display = ('reservation_num', 'guest_ID', 'session_code', 'booked_on', 'status')
    list_filter = ('status',)

admin.site.register(Guest, GuestAdmin)
admin.site.register(Club, ClubAdmin)
admin.site.register(YogaSession, YogaSessionAdmin)
admin.site.register(Reservation, ReservationAdmin)
