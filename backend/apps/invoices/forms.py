from django import forms

from apps.clients.models import Customer
from .models import Invoice, InvoiceItem

from django.conf import settings


class InvoiceForm(forms.ModelForm):
    tps = forms.BooleanField(
        required=False,
        initial=True,
        label="TPS (5%)",
        widget=forms.CheckboxInput(attrs={"class": "form-check-input"})
    )
    tvq = forms.BooleanField(
        required=False,
        initial=True,
        label="TVQ (9.975%)",
        widget=forms.CheckboxInput(attrs={"class": "form-check-input"})
    )

    class Meta:
        model = Invoice
        fields = ["code", "customer", "status"]

    def __init__(self, *args, **kwargs):
        company = kwargs.pop("company", None)
        super().__init__(*args, **kwargs)

        if company:
            self.fields["customer"].queryset = Customer.objects.filter(company=company)


class InvoiceItemForm(forms.ModelForm):
    class Meta:
        model = InvoiceItem
        fields = ["name", "quantity", "price"]
