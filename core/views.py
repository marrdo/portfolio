from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import MensajeContactoSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ValidationError
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from django.core.mail import EmailMessage

class ContactoAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = MensajeContactoSerializer(data=request.data)
        if request.data.get('contact_time'):
            return Response({"error": "Parece spam"}, status=400)
        if not serializer.is_valid():
            print("Errores de validación:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Guarda IP y user-agent si los vas a usar en el modelo
        if hasattr(serializer.Meta.model, 'ip_remitente'):
            # serializer.validated_data['ip_remitente'] = request.META.get('REMOTE_ADDR')
            serializer.validated_data['ip_remitente'] = request.META.get('HTTP_X_FORWARDED_FOR') or request.META.get('REMOTE_ADDR')
        if hasattr(serializer.Meta.model, 'user_agent'):
            serializer.validated_data['user_agent'] = request.META.get('HTTP_USER_AGENT')

        # Guardar en base de datos (opcional, solo si lo necesitas)
        serializer.save()

        # Enviar correo
        data = serializer.validated_data
        asunto = f"Contacto desde portfolio: {data['asunto']}"
        mensaje = f"De: {data['nombre']} <{data['email']}>\n\n{data['mensaje']}"
        # todo está en UTF-8
        asunto = asunto.encode('utf-8').decode('utf-8')
        mensaje = mensaje.encode('utf-8').decode('utf-8')
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [settings.EMAIL_HOST_USER]
        email = EmailMessage(
            subject=asunto,
            body=mensaje,
            from_email=from_email,
            to=recipient_list,
        )
        email.content_subtype = 'plain'
        email.encoding = 'utf-8'
        try:
            # send_mail(asunto, mensaje, from_email, recipient_list) No usar este
            email.send(fail_silently=False)
        except BadHeaderError:
            return Response({"error": "Encabezado inválido."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print("ERROR ENVIANDO CORREO:", str(e))
            return Response({"error": f"Error al enviar el correo: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"success": "Mensaje enviado correctamente."}, status=status.HTTP_200_OK)
