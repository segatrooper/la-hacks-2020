from django.urls import path
from . import views


urlpatterns = [
        path('api/tp/', views.TpListCreate.as_view()),

        ]
