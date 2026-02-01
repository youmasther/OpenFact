from django.shortcuts import render
from django.shortcuts import render, redirect
from django.forms import modelformset_factory
from .models import InvoiceItem, Invoice
from .forms import InvoiceForm, InvoiceItemForm
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
# Create your views here
from django.conf import settings



def invoice_view(request):
    if not request.user.is_authenticated:
        return redirect('users:login')
    
    company = request.user.administrator.company
    invoices_list =  Invoice.objects.filter(company=request.user.administrator.company).order_by('-created_at')
    for administrator in invoices_list:
        administrator.acronym = f"{administrator.user.first_name[0].upper()}{administrator.user.last_name[0].upper()}"

    page = request.GET.get('page', 1) 
    paginator = Paginator(invoices_list, 10)

    try:
        invoices = paginator.page(page)
    except PageNotAnInteger:
        invoices = paginator.page(1)
    except EmptyPage:
        invoices = paginator.page(paginator.num_pages)

    print(invoices)
    context = {
        "invoices": invoices
    }
    return render(request, 'invoice.html')




def add_invoice(request):
    company = request.user.administrator.company
    InvoiceItemFormSet = modelformset_factory(InvoiceItem, form=InvoiceItemForm, extra=1)

    if request.method == "POST":
        form = InvoiceForm(request.POST, company=company)
        formset = InvoiceItemFormSet(request.POST, queryset=InvoiceItem.objects.none())

        if form.is_valid() and formset.is_valid():
            invoice = form.save(commit=False)
            invoice.company = company
            invoice.save()

            subtotal = 0

            for item_form in formset:
                item = item_form.save(commit=False)
                item.invoice = invoice
                item.total = item.quantity * item.price
                subtotal += item.total
                item.save()

            tax_total = 0
            if form.cleaned_data["tps"]:
                tax_total += subtotal * settings.TPS_RATE / 100

            if form.cleaned_data["tvq"]:
                tax_total += subtotal * settings.TVQ_RATE / 100

            grand_total = subtotal + tax_total

            print("Subtotal:", subtotal)
            print("Taxes:", tax_total)
            print("Total:", grand_total)

            return redirect("invoices:invoices")
    else:
        form = InvoiceForm(company=company)
        formset = InvoiceItemFormSet(queryset=InvoiceItem.objects.none())

    return render(request, "add_invoice.html", {"form": form, "formset": formset})