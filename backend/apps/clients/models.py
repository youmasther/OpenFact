from django.db import models
from apps.users.models import Company
# Create your models here.

class Customer(models.Model):
    CUSTOMER_TYPE = [
        ('INDIVIDUAL', 'INDIVIDUAL'),
        ('COMPANY', 'COMPANY'),
    ]
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50, blank=True)
    gsm = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True)
    zipcode = models.CharField(max_length=20, blank=True)
    nep = models.CharField(max_length=20, blank=True, null=True)
    customer_type = models.CharField(max_length=20, choices=CUSTOMER_TYPE, default='INDIVIDUAL')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
