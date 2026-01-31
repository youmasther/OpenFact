"""
URL configuration for openfac project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.users.urls', namespace='users')),
    path('client/', include('apps.clients.urls', namespace='clients')),
    path('facture/', include('apps.invoices.urls', namespace='invoices')),
    # path('', include('apps.taxes.urls', namespace='taxes')),
]

if settings.DEBUG:
    # En mode développement, servir les fichiers statiques et médias via Django
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    # En mode production, les fichiers statiques et médias devraient être servis par le serveur web
    # Assurez-vous que STATIC_ROOT et MEDIA_ROOT sont correctement configurés
    pass