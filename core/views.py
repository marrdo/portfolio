# Primera vista 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny  # Cualquier usuario puede acceder

class ApiGeneralView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"message": "Hola, API!"})
