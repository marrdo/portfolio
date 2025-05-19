from rest_framework import serializers
from .models import MensajeContacto

class MensajeContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MensajeContacto
        fields = '__all__'

    def validate_nombre(self, value):
        if not value.replace(" ", "").isalpha():
            raise serializers.ValidationError("El nombre solo debe contener letras.")
        return value

    def validate_asunto(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("El asunto debe tener al menos 5 caracteres.")
        return value

    def validate_mensaje(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("El mensaje debe tener al menos 10 caracteres.")
        return value