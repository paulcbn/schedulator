# Create your views here.
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import FormView, RedirectView

from frontend.forms import LoginForm, RegisterForm


class LoginView(FormView):
    form_class = LoginForm
    template_name = 'frontend/login.html'
    success_url = reverse_lazy('main-view')

    def form_valid(self, form):
        """
        If the form is valid the user is logged in
        valid implies the user exists
        """
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(self.request, username=username, password=password)
        if user is not None:
            login(request=self.request, user=user)
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        """
        context - dict
        add in context new params to be past to template
        """
        context = super().get_context_data(**kwargs)
        context['title'] = 'Login'
        context['register_view'] = reverse_lazy('user-register-view')
        return context


class RegisterView(FormView):
    form_class = RegisterForm
    template_name = 'frontend/register.html'
    success_url = reverse_lazy('user-login-view')

    def form_valid(self, form):
        """
        If the form is valid the user is registered
        valid implies the password and email are respecting the main django
        authentication rules and the username is not taken
        """
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Register'
        return context


class LogoutView(RedirectView):
    url = reverse_lazy('main-view')

    def get(self, request, *args, **kwargs):
        logout(request)
        return super().get(request, *args, **kwargs)


class MainView(View):
    """
    The main view is the one showed at main address '/'
    """

    def get(self, request):
        user = request.user
        return render(
            request, 'frontend/main.html',
            {
                'user': user,
                'logout_view': reverse_lazy('user-logout-view'),
                'login_view': reverse_lazy('user-login-view'),
            }
        )
