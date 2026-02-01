from django.urls import path
from . import views

app_name = 'invoices'

urlpatterns = [
    path('', views.invoice_view, name='invoices'),
    path('add', views.add_invoice, name='add_invoice'),
]