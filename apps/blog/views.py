from django.shortcuts import render #Se usa en Django para renderizar plantillas HTML (no se usa en este código, pero se podría emplear en otras views si se quisiera devolver HTML).
from rest_framework import status #Contiene códigos de estado HTTP (como 200 OK, 404 Not Found), aunque no se está usando en este código.
from rest_framework.generics import ListAPIView, RetrieveAPIView # Proporciona clases genéricas para crear vistas sin tener que escribir código repetitivo.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Post, Category, Heading, PostView, PostAnalytics #Importamos los modelos que representan las tablas de la base de datos (Post, Category, Heading).
from .serializers import PostSerializer, CategorySerializer, PostListSerializer, HeadingSerializer, PostView , PostAnalyticsSerializer#Importamos los serializadores, que transforman los datos de los modelos a JSON para la API.
from .utils import get_client_ip
#ListAPIView -> Es una vista genérica de Django REST Framework que permite obtener una lista de objetos en formato JSON (equivalente a GET /api/posts/).
#RetrieveAPIView -> Es una vista genérica para obtener un solo objeto de la base de datos.
class PostListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        posts = Post.postobjects.all()
        for post in posts:
            analytics, created = PostAnalytics.objects.get_or_create(post=post)
            analytics.impressions += 1
            analytics.save()
        
        serialized_posts = PostListSerializer(posts, many=True).data
        return Response(serialized_posts)

class PostDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        try:
            post = Post.postobjects.get(slug=slug)
            analytics, created = PostAnalytics.objects.get_or_create(post=post)
            analytics.clicks += 1
            analytics.save()

            serialized_post = PostSerializer(post).data
            return Response(serialized_post, status=200)
        except Post.DoesNotExist:
            return Response({"error": "Post no encontrado"}, status=404)

            
class PostHeadingView(ListAPIView): #Si hacemos una petición GET a /api/blog/posts/<slug>/headings/, esta vista devolverá todos los encabezados asociados a ese post
    """
    Vista para obtener los encabezados (`Heading`) de un post específico.

    Esta vista hereda de `ListAPIView` y devuelve una lista de encabezados asociados a un post.

    Atributos:
        serializer_class (Serializer): Serializador que transforma los datos del modelo `Heading`
                                       en JSON usando `HeadingSerializer`.

    Métodos:
        get_queryset(self): Filtra y devuelve solo los encabezados (`Heading`) del post
                            cuyo `slug` se obtiene desde la URL.

    Uso:
        - Petición GET a `/api/blog/posts/<slug>/headings/` devuelve todos los encabezados
          asociados al post con el slug especificado.
    """
    serializer_class = HeadingSerializer #Usa este serializador para devolver los datos en JSON
    def get_queryset(self): #Método que filtra los encabezados (Heading) que pertenecen a un post específico.
        """
        Obtiene la lista de encabezados (`Heading`) asociados a un post en particular.

        El `slug` del post se obtiene desde los parámetros de la URL (`kwargs`),
        y se utiliza para filtrar los encabezados relacionados con dicho post.

        Retorna:
            QuerySet: Conjunto de objetos `Heading` filtrados por `post__slug`.
        """
        post_slug = self.kwargs.get("slug") #Obtiene el slug desde la URL.
        return Heading.objects.filter(post__slug = post_slug) #Busca en la base de datos los encabezados que pertenecen a un Post con ese slug.
class PostAnalyticsView(RetrieveAPIView):
    """
    API para obtener las métricas de un post.
    """
    queryset = PostAnalytics.objects.all()
    serializer_class = PostAnalyticsSerializer
    lookup_field = "post_slug"