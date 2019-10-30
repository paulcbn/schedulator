from django.urls import path

from frontend.views import LoginView, MainView, RegisterView, LogoutView

urlpatterns = [
    path('login/', LoginView.as_view(), name='user-login-view'),
    path('register/', RegisterView.as_view(), name='user-register-view'),
    path('logout/', LogoutView.as_view(), name='user-logout-view'),

    path('', MainView.as_view(), name='main-view'),

]
