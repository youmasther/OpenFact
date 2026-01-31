from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
# Register your models here.

from .models import CustomUser,Company, Administrator

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Configuration des champs à afficher dans la liste des utilisateurs
    list_display = ('email', 'phone', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'phone', 'first_name', 'last_name')
    ordering = ('email',)
    readonly_fields = ('date_joined',)
    
    # Configuration des champs dans le formulaire d'édition
    fieldsets = (
        (None, {'fields': ('email', 'phone', 'password')}),
        (_('Personal Info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', )}),
        (_('Important dates'), {'fields': ('date_joined',)}),
    )

    # Configuration des champs dans le formulaire de création
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone', 'password1', 'password2'),
        }),
    )


admin.site.register(Company)

admin.site.register(Administrator)