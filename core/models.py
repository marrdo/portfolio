from django.db import models
import uuid

class MensajeContacto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    asunto = models.CharField(max_length=200)
    mensaje = models.TextField()
    telefono = models.CharField(max_length=20, blank=True, null=True)  # 👈 opcional
    ip_remitente = models.GenericIPAddressField(blank=True, null=True)  # 👈 opcional
    user_agent = models.TextField(blank=True, null=True)  # 👈 opcional
    leido = models.BooleanField(default=False)  # 👈 para marcar si lo has leído
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.nombre} - {self.asunto}'