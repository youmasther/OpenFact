from django.db import models
from apps.users.models import Company
# Create your models here.


class Invoice(models.Model):
    INVOICE_STATUS = [
        ('PENDING', 'EN ATTENTE'),
        ('SEND', 'ENVOYÉ'),
        ('PAID', 'PAYÉ'),
    ]
    code = models.CharField(max_length=255 , unique=True)
    comnany = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=INVOICE_STATUS, default='PENDING')

    class Meta:
        verbose_name = 'Facture'
        verbose_name_plural = 'Factures'
        db_table = 'invoice'
        db_table_comment = 'Table des factures'

    def __str__(self):
        return self.code
    


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = 'Item de facture'
        verbose_name_plural = 'Items de facture'
        db_table = 'invoice_item'
        db_table_comment = 'Table des items de facture'

    def __str__(self):
        return self.name + ' (' + str(self.quantity) + ' x ' + str(self.price) + ' = ' + str(self.total) + ')'
    
