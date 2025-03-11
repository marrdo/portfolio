from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils.translation import gettext as _

from .models import Perfil, Habilidad, Proyecto, Empresa, Experiencia, Educacion
from .serializers import (
    HabilidadSerializer, EmpresaSerializer, EducacionSerializer, 
    ExperienciaSerializer, ProyectoSerializer, PerfilSerializer
)

class ProyectoListView(ListAPIView):
    """
    Vista para listar todos los proyectos disponibles en la base de datos.

    - Ordena los proyectos en orden descendente por el título.
    - Utiliza el serializador `ProyectoSerializer` para transformar los datos.
    - Permite acceso público (sin autenticación).
    """
    queryset = Proyecto.objects.all().order_by('-title')
    serializer_class = ProyectoSerializer
    permission_classes = [AllowAny]


class ProyectoDetailView(RetrieveAPIView):
    """
    Vista para obtener un proyecto específico mediante su slug.

    - Busca el proyecto en la base de datos usando el campo `slug` en lugar del ID.
    - Si el proyecto existe, devuelve su información serializada.
    - Si no existe, devuelve un error 404.
    """
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer
    lookup_field = "slug"


class PerfilDetailView(RetrieveAPIView):
    """
    Vista para obtener los detalles de un perfil mediante su slug.

    - Busca el perfil por el campo `slug` en la base de datos.
    - Devuelve los datos serializados si el perfil existe.
    - Si no existe, devuelve un error 404.
    """
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer
    lookup_field = "slug"


class ExperienciaListView(ListAPIView):
    """
    Vista para listar todas las experiencias registradas en la base de datos.

    - Utiliza el serializador `ExperienciaSerializer` para transformar los datos.
    - Devuelve una lista con todas las experiencias disponibles.
    """
    queryset = Experiencia.objects.all()
    serializer_class = ExperienciaSerializer


class HabilidadListView(ListAPIView):
    """
    Vista para listar todas las habilidades registradas en la base de datos.

    - Utiliza el serializador `HabilidadSerializer` para transformar los datos.
    - Devuelve una lista con todas las habilidades disponibles.
    """
    queryset = Habilidad.objects.all()
    serializer_class = HabilidadSerializer


class EducacionListView(ListAPIView):
    """
    Vista para listar todas las titulaciones registradas en la base de datos.

    - Utiliza el serializador `EducacionSerializer` para transformar los datos.
    - Devuelve una lista con todas las titulaciones disponibles.
    """
    queryset = Educacion.objects.all()
    serializer_class = EducacionSerializer
