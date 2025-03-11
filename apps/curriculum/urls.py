from django.urls import path
from .views import (
    ProyectoListView, ProyectoDetailView, PerfilDetailView, 
    ExperienciaListView, HabilidadListView, EducacionListView
)

urlpatterns = [
    path("proyectos/", ProyectoListView.as_view(), name="proyecto-list"),
    path("proyecto/<slug:slug>/", ProyectoDetailView.as_view(), name="proyecto-detail"),
    path("habilidades/", HabilidadListView.as_view(), name="habilidades-list"),
    path("perfil/<slug:slug>/", PerfilDetailView.as_view(), name="perfil-detail"),
    path("experiencias/", ExperienciaListView.as_view(), name="experiencia-list"),
    path("educaciones/", EducacionListView.as_view(), name="educacion-list"),
]
