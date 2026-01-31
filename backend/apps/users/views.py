from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
# Create your views here.


def login(request):
    if request.method == 'POST':
        username = request.POST.get('login')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)    
            return redirect('users:index')
        return render(request, 'login.html', {'message': 'Login ou mot de passe incorrect'})
    return render(request, 'login.html')

def logout(request):
    logout(request)
    return redirect('users:login')

def index(request):
    return render(request, 'index.html')