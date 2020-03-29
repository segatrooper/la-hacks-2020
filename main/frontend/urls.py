from django.urls import path
from . import views

urlpatterns = [
        path('', views.home, name="home"),
        path('tp/', views.tp, name="tp"),
        path('tp/download', views.download_file, name="download"),
        ]
