from rest_framework import serializers
from .models import Post, Category, Heading

class PostSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo `Post`.

    Serializa todos los campos del modelo para ser usados en la API.
    """
    class Meta:
        """Define el modelo a serializar y los campos incluidos."""
        model = Post
        fields = "__all__"
class PostListSerializer(serializers.ModelSerializer):
    """
    Serializador para la lista de posts.

    Similar a `PostSerializer`, pero puede usarse para optimizar consultas
    cuando no se necesitan todos los detalles.
    """
    class Meta:
        """Define el modelo a serializar y los campos incluidos."""
        model = Post
        fields = "__all__"
class CategorySerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo `Category`.

    Se encarga de convertir los datos de las categorías en JSON para la API.
    """
    class Meta:
        """Define el modelo a serializar y los campos incluidos."""
        model = Category
        fields = [
            "id",
            "title",
            "description",
            "thumbnail",
            "slug",
            "category",
            "status",
        ]
class HeadingSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo `Heading`.

    Permite transformar los encabezados de un post en datos JSON.
    """
    class Meta:
        """Define el modelo a serializar y los campos incluidos."""
        model = Heading
        fields = [
            "id",
            "title",
            "slug",
            "level",
            "order",
        ]
