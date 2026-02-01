from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from apps.users.models import Administrator
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