from django.shortcuts import render, redirect
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import JsonResponse

from .forms import CustomerForm

from .models import Customer

# Create your views here.


def customer_view(request):
    if not request.user.is_authenticated:
        return redirect('users:login')
    company = request.user.administrator.company
    customers_list = Customer.objects.filter(company=company)
    
    page = request.GET.get('page', 1)  
    paginator = Paginator(customers_list, 10) 

    try:
        customers = paginator.page(page)
    except PageNotAnInteger:
        customers = paginator.page(1)
    except EmptyPage:
        customers = paginator.page(paginator.num_pages)

    context = {
        "customers": customers
    }
    return render(request, 'customer.html', context)

def add_customer(request):
    if request.method != 'POST':
        return JsonResponse({'status': 0, 'message': 'Méthode non autorisée.'}, status=405)

    data = request.POST.copy()
    print(data)
     # Vérification des champs obligatoires
    required_fields = {
        'Le nom': data.get('name'),
        'email': data.get('email'),
        'telephone': data.get('phone'),
        'code postal': data.get('zipcode'),
        'adresse': data.get('address')
    }
    
    missing_fields = [key for key, value in required_fields.items() if not value]
    if missing_fields:
        return JsonResponse({'status': 0, 'message': f"Champs requis : {', '.join(missing_fields)}"}, status=400)
    
    form = CustomerForm(request.POST)
    if form.is_valid():
        customer = form.save(commit=False)
        customer.company = request.user.administrator.company
        customer.customer_type = "INDIVIDUAL" if not data.get('nep') else "COMPANY"
        customer.save()
        return JsonResponse({'status': 1, 'message': f"client crée avec succes "}, status=201)
    else:
        return JsonResponse({'status': 0, 'message': f"Veuillez vérifier les donées soumise "}, status=400)





