from rest_framework import serializers
from .models import Post, Category, Heading, PostView, PostAnalytics

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
            "name",
            "title",
            "description",
            "thumbnail",
            "slug",
            "parent",
            "created_at",
            "update_at",
        ]
class CategoryListSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo `Category`.

    Se encarga de convertir los datos de las categorías en JSON para la API.
    """
    class Meta:
        """Define el modelo a serializar y los campos incluidos."""
        model = Category
        fields = [
            "name",
            "slug",
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
class PostViewSerializer(serializers.ModelSerializer):
    
    class Meta:
        """Define el modelo a serializar y los campos incluidos."""
        model = PostView
        fields = "__all__"
class PostSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo `Post`.

    Serializa todos los campos del modelo para ser usados en la API.
    """
    category = CategorySerializer()
    headings = HeadingSerializer(many = True) #Many = true porque podemos tener muchos headings
    view_count = serializers.SerializerMethodField()
    meta_description = serializers.CharField()
    og_title = serializers.CharField(allow_null=True)
    og_description = serializers.CharField(allow_null=True)
    og_image = serializers.ImageField(allow_null=True)
    twitter_title = serializers.CharField(allow_null=True)
    twitter_description = serializers.CharField(allow_null=True)
    twitter_image = serializers.ImageField(allow_null=True)
    class Meta:
        """Define el modelo a serializar y los campos incluidos."""
        model = Post
        fields = [
            "id", "title", "description", "content", "thumbnail", "keywords",
            "slug", "category", "created_at", "update_at", "status", "headings", "view_count",
            "meta_description", "og_title", "og_description", "og_image",
            "twitter_title", "twitter_description", "twitter_image"
        ]
    def get_view_count(self, obj):
        return obj.post_view.count()
class PostListSerializer(serializers.ModelSerializer):
    """
    Serializador para la lista de posts.

    Similar a `PostSerializer`, pero puede usarse para optimizar consultas
    cuando no se necesitan todos los detalles.
    """
    category = CategoryListSerializer()
    view_count = serializers.SerializerMethodField()
    class Meta:
        """Define el modelo a serializar y los campos incluidos."""
        model = Post
        fields = "__all__"

    def get_view_count(self, obj):
        return obj.post_view.count()



class PostAnalyticsSerializer(serializers.ModelSerializer):
    ctr = serializers.SerializerMethodField()

    class Meta:
        model = PostAnalytics
        fields = ["post", "impressions", "clicks", "ctr"]

    def get_ctr(self, obj):
        return obj.ctr()
