from django.contrib import admin

# Register your models here.

from .models import CustomUser,Company, Administrator

admin.site.register(CustomUser)

admin.site.register(Company)

admin.site.register(Administrator)