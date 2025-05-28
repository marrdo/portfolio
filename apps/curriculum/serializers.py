from rest_framework import serializers
from .models import Perfil, Habilidad, Empresa, Educacion, Experiencia, Proyecto

class HabilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habilidad
        fields = "__all__"

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = "__all__"

class EducacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Educacion
        fields = "__all__"

class ExperienciaSerializer(serializers.ModelSerializer):
    empresa = EmpresaSerializer()  # Una experiencia está relacionada con una única empresa
    habilidades = HabilidadSerializer(many=True)
    class Meta:
        model = Experiencia
        fields = "__all__"

class ProyectoSerializer(serializers.ModelSerializer):
    habilidades = HabilidadSerializer(many=True)  # Un proyecto puede tener muchas habilidades
    empresas = EmpresaSerializer(many=True, read_only=True)

    class Meta:
        model = Proyecto
        fields = "__all__"

class PerfilSerializer(serializers.ModelSerializer):
    # habilidades = HabilidadSerializer(many=True)  # Un perfil puede tener muchas habilidades
    # proyectos = ProyectoSerializer(many=True)  # Un perfil puede tener muchos proyectos
    # titulos = EducacionSerializer(many=True)  # Un perfil puede tener muchos títulos (educaciones)
    # experiencias = ExperienciaSerializer(many=True)  # Un perfil puede tener muchas experiencias

    class Meta:
        model = Perfil
        fields = "__all__"
        depth = 1