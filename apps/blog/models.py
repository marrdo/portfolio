import uuid

from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field

def blog_thumail_directory(instance, filename):
    """Define la ruta donde se guardarán las imágenes de los posts."""
    return "blog/{0}/{1}".format(instance.title, filename)

def category_thumail_directory(instance, filename):
    """Define la ruta donde se guardarán las imágenes de las categorías."""
    return "blog_categories/{0}/{1}".format(instance.name, filename)

# Cada clase represednta una tabla de la bdd y cada atributo de la clase representa una columna de la tabla.
# Cada objeto de la clase representa una fila de la tabla.

class Category(models.Model):
    """
    Representa una categoría dentro del blog.

    Permite organización jerárquica con subcategorías mediante la relación `parent`.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    parent = models.ForeignKey("self", related_name="children", on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    thumbnail = models.ImageField(upload_to=category_thumail_directory, blank=True, null=True)
    slug = models.CharField(max_length=128, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    update_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        """Retorna el nombre de la categoría como representación en string."""
        return self.name
    def save(self, *args, **kwargs):
        """Genera automáticamente el `slug` basado en el nombre si no está definido."""
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class Post(models.Model):
    """
    Representa un artículo del blog.

    Cada post pertenece a una categoría y tiene un estado que puede ser `draft`, `published` o `deleted`.
    """
    class PostObjects(models.Manager):
        """Manager personalizado para obtener solo los posts publicados."""
        def get_queryset(self):
            """Filtra los posts para mostrar solo los que tienen estado 'published'."""
            return super().get_queryset().filter(status="published")
    
    options = (
        ("draft", "Draft"),
        ("published", "Published"),
        ("deleted", "Deleted")
    )
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128)
    description = models.CharField(max_length=256)
    content = CKEditor5Field('Content', config_name='extends')
    thumbnail = models.ImageField(upload_to=blog_thumail_directory)
    keywords = models.TextField()
    slug = models.CharField(max_length=128, unique=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)#Si se borra la categoría no se borra el POST.
    created_at = models.DateTimeField(default=timezone.now)
    update_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=16, choices=options, default="draft")
    objects = models.Manager() # The default manager.
    postobjects = PostObjects() # The custom manager.
    class Meta:
        """Configura el orden predeterminado de los posts en consultas."""
        ordering = ["status", "-created_at",]

    def save(self, *args, **kwargs):
        """Genera automáticamente el `slug` basado en el título si no está definido."""
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    def __str__(self):
        """Retorna el título del post como representación en string."""
        return self.title
class PostView(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post, on_delete=models.PROTECT, related_name='post_view')
    ip_address = models.GenericIPAddressField()
    timestamp = models.DateTimeField(auto_now_add=True)
class Heading(models.Model):
    """
    Representa un encabezado dentro de un post.

    Puede ser un `H1`, `H2`, `H3`, etc., y se ordena dentro del post.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post, on_delete=models.PROTECT, related_name='headings')#Si se borra el heading no se borra el POST.
    title = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    level = models.IntegerField(
        choices=(
            (1,"H1"),
            (2,"H2"),
            (3,"H3"),
            (4,"H4"),
            (5,"H5"),
            (6,"H6"),
        )
    )
    # level = models.CharField(choices=[(i, f"H{i}") for i in range(1, 7)])
    order = models.PositiveIntegerField()
    
    class Meta:
        """Configura el orden de los encabezados dentro de un post."""
        ordering = ["order",]
        
    def save(self, *args, **kwargs):
        """Genera automáticamente el `slug` basado en el título si no está definido."""
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)