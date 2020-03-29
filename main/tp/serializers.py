from rest_framework import serializers
from .models import Tp

class TpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tp
        fields = ('name', 'company', 'price')
