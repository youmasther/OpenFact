from django.shortcuts import render

# Create your views here.


def login(request):
    if request.method == 'POST':
        username = request.POST.get('login')
        password = request.POST.get('password')
        print(username, password)
        return render(request, 'index.html')
    return render(request, 'login.html')

def index(request):
    return render(request, 'index.html')