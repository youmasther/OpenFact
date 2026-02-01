from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.contrib import messages
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from apps.users.models import Administrator, CustomUser, Company
# Create your views here.


def login(request):
    if request.method == 'POST':
        username = request.POST.get('login')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            if not user.is_active:
                return render(request, 'login.html', {
                    'message': "Compte désactivé."
                })
            
            try:
                admin_profile = user.administrator  
                if admin_profile.company is None:
                    return render(request, 'login.html', {
                        'message': "Accès non autorisé. Contactez l'administrateur."
                    })
            except Administrator.DoesNotExist:
                return render(request, 'login.html', {
                    'message': "Votre compte n'est pas configuré pour accéder au système."
                })

            auth_login(request, user)
            return redirect('users:index')

        return render(request, 'login.html', {
            'message': 'Login ou mot de passe incorrect'
        })

    return render(request, 'login.html')

def logout(request):
    auth_logout(request)
    return redirect('users:login')

@transaction.atomic
def register(request):
    if request.method == "POST":
        company_name = request.POST.get("company_name")
        company_address = request.POST.get("company_address")

        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")

        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")

        if password1 != password2:
            messages.error(request, "Les mots de passe ne correspondent pas.")
            return redirect("users:register")

        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, "Cet email est déjà utilisé.")
            return redirect("users:register")

        company = Company.objects.create(
            company_name=company_name,
            address=company_address,
            email=email,
            phone=phone,
        )

        user = CustomUser.objects.create_user(
            email=email,
            phone=phone,
            password=password1,
            first_name=first_name,
            last_name=last_name,
        )

        Administrator.objects.create(
            user=user,
            company=company,
            type_user="admin",
        )

        user = authenticate(request, email=email, password=password1)
        if user is not None:
            auth_login(request, user)
            return redirect("users:index")

        messages.error(request, "Un erreur s'est produite. Veuillez contacter l'administrateur.")
        return redirect("users:register")

    return render(request, "register.html")

def index(request):
    if not request.user.is_authenticated:
        return redirect('users:login')
    
    company = request.user.administrator.company
    administrators_list = Administrator.objects.filter(company=company)
    for administrator in administrators_list:
        administrator.acronym = f"{administrator.user.first_name[0].upper()}{administrator.user.last_name[0].upper()}"

    page = request.GET.get('page', 1) 
    paginator = Paginator(administrators_list, 10)

    try:
        administrators = paginator.page(page)
    except PageNotAnInteger:
        administrators = paginator.page(1)
    except EmptyPage:
        administrators = paginator.page(paginator.num_pages)

    print(administrators)
    context = {
        "administrators": administrators
    }
    return render(request, 'index.html', context)