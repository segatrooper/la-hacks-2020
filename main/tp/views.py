from django.shortcuts import render
from .models import Tp
from .serializers import TpSerializer
from rest_framework import generics

# Create your views here.
class TpListCreate(generics.ListCreateAPIView):
    queryset = Tp.objects.all()
    serializer_class = TpSerializer
