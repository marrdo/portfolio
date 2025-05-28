from django.db import models
import uuid, re, datetime, os
from unidecode import unidecode
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from django_ckeditor_5.fields import CKEditor5Field
from phonenumber_field.modelfields import PhoneNumberField

def upload_to(instance, filename, folder):
    """Genera una ruta única para almacenar imágenes en la carpeta correspondiente."""
    ext = filename.split('.')[-1]  # Extrae la extensión del archivo
    filename = f"{uuid.uuid4()}.{ext}"  # Nombre único para la imagen
    return os.path.join(folder, filename)  # Guardar en 'media/{folder}/'

def upload_to_seo(instance, filename):
    return upload_to(instance, filename, 'SEO')

def upload_to_perfil(instance, filename):
    return upload_to(instance, filename, 'perfiles')

def upload_to_habilidad(instance, filename):
    return upload_to(instance, filename, 'habilidad')

def upload_to_proyecto(instance, filename):
    return upload_to(instance, filename, 'proyecto')

def upload_to_empresa(instance, filename):
    return upload_to(instance, filename, 'empresa')

def upload_to_titulo(instance, filename):
    return upload_to(instance, filename, 'titulo')

def generate_slug(*args):
    """
    Genera un slug limpio a partir de los parámetros dados.

    Elimina caracteres no alfanuméricos (excepto espacios) y genera un slug basado en los parámetros.

    Args:
        *args (str): Los parámetros que se usarán para generar el slug.

    Returns:
        str: El slug generado.
    """
    # Unir los parámetros con un guion
    text = '-'.join(map(str, args))  # Convierte cada parámetro a string y los une con un guion
    # Limpiar el texto para eliminar caracteres no alfanuméricos (excepto los espacios)
    cleaned_text = re.sub(r'[^a-zA-Z0-9 ]', '', text)  # Solo letras, números y espacios
    # Generar el slug
    return slugify(unidecode(cleaned_text))  # Limpiar acentos con unidecode antes de generar el slug


class BaseSEO(models.Model):
    """
    Clase base para gestionar información SEO relacionada con una URL.

    Incluye campos para la URL canónica, meta descripción, y metadatos de Open Graph (OG).
    También proporciona un campo para una imagen de Open Graph.

    Esta clase es abstracta y debe ser heredada por otros modelos que necesiten SEO.
    """
    url_canonical = models.URLField(_('URL canonical'), max_length=200, null=True, blank=True)
    meta_description = models.CharField(max_length=255, null=True, blank=True)
    og_title = models.CharField(max_length=256, blank=True, null=True)
    og_description = models.CharField(max_length=256, blank=True, null=True)
    og_image = models.ImageField(upload_to=upload_to_seo, blank=True, null=True)

    class Meta:
        abstract = True

class Perfil(BaseSEO, models.Model):
    """
    Modelo que representa el perfil de una persona, incluyendo información personal,
    enlaces a redes sociales, y datos asociados a su presencia en línea.

    Además, hereda de `BaseSEO` para incluir metadatos SEO y un campo para la imagen de perfil.

    Attributes:
        id (UUIDField): Identificador único del perfil.
        slug (SlugField): Slug generado para la URL del perfil.
        dni (CharField): DNI del usuario.
        nombre (CharField): Nombre del usuario.
        apellido_1 (CharField): Primer apellido del usuario.
        apellido_2 (CharField): Segundo apellido del usuario.
        email (EmailField): Correo electrónico del usuario.
        telefono (PhoneNumberField): Número de teléfono del usuario.
        linkedin (URLField): Enlace a LinkedIn.
        facebook (URLField): Enlace a Facebook.
        twitter (URLField): Enlace a Twitter.
        instagram (URLField): Enlace a Instagram.
        github (URLField): Enlace a GitHub.
        web_personal (URLField): Enlace a la página web personal.
        direccion (CharField): Dirección física del usuario.
        thumbnail (ImageField): Imagen de perfil.
        tiny (ImageField): Imagen de perfil optimizada para móvil.
        created_at (DateTimeField): Fecha de creación del perfil.
        modified_at (DateTimeField): Fecha de la última modificación.
    """
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(_("Slug"), unique=True, max_length=128)
    dni = models.CharField(_("DNI"), max_length=20, unique=True)
    nombre = models.CharField(_("Nombre"), max_length=50)
    apellido_1 = models.CharField(_("Primer Apellido"), max_length=100)
    apellido_2 = models.CharField(_("Segundo Apellido"), max_length=100, blank=True, null=True)
    email = models.EmailField(_("Correo Electrónico"), max_length=254, unique=True)
    telefono = PhoneNumberField(_("Teléfono"), blank=True, null=True, region="ES")
    fecha_nacimiento = models.DateField(_("Fecha de nacimiento"), auto_now=False, auto_now_add=False, default=datetime.date.today, null=True, blank=True,)
    linkedin = models.URLField(_("LinkedIn"), max_length=200, blank=True, null=True)
    facebook = models.URLField(_("Facebook"), max_length=200, blank=True, null=True)
    twitter = models.URLField(_("Twitter"), max_length=200, blank=True, null=True)
    instagram = models.URLField(_("Instagram"), max_length=200, blank=True, null=True)
    github = models.URLField(_("GitHub"), max_length=200, blank=True, null=True)
    web_personal = models.URLField(_("Web Personal"), max_length=200, blank=True, null=True)
    direccion = models.CharField(_("Dirección"), max_length=200, blank=True, null=True)
    thumbnail = models.ImageField(_("Imagen de perfil"), upload_to=upload_to_perfil, blank=True, null=True)
    tiny = models.ImageField(_("Imagen de perfil móvil"), upload_to=upload_to_perfil, blank=True, null=True)
    created_at = models.DateTimeField(_("Creado en"), auto_now_add=True)
    modified_at = models.DateTimeField(_("Modificado en"), auto_now=True)

    class Meta:
        verbose_name = _("Perfil")
        verbose_name_plural = _("Perfiles")
        ordering = ["-created_at"]
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_slug(f"{self.nombre}-{self.apellido_1}")
        # Verificar si el slug ya existe y agregar un sufijo si es necesario
        base_slug = self.slug
        counter = 1
        while Perfil.objects.filter(slug=self.slug).exists():  
            self.slug = f"{base_slug}-{counter}"
            counter += 1
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        from django.urls import reverse
        return reverse("perfil_detalle", kwargs={"slug": self.slug})

    def __str__(self):
        return f"{self.nombre} {self.apellido_1}"

class Habilidad(models.Model):
    """
    Modelo para representar las habilidades o tecnologías que maneja un usuario.

    Incluye un nombre, una imagen representativa de la habilidad, y una relación con el perfil del usuario.

    Attributes:
        id (UUIDField): Identificador único de la habilidad.
        slug (SlugField): Slug generado para la URL de la habilidad.
        nombre (CharField): Nombre de la habilidad.
        perfil (ForeignKey): Relación con el perfil del usuario.
        thumbnail (ImageField): Imagen representativa de la habilidad.
        tiny (ImageField): Imagen optimizada para dispositivos móviles.
        created_at (DateTimeField): Fecha de creación de la habilidad.
        modified_at (DateTimeField): Fecha de la última modificación.
    """
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(_("Slug"), unique=True, max_length=128)
    nombre = models.CharField(_("Nombre"), max_length=50)
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE, related_name="habilidades")
    thumbnail = models.ImageField(_("Imagen de habilidad"), upload_to=upload_to_habilidad, blank=True, null=True)
    tiny = models.ImageField(_("Imagen de habilidad para móvil"), upload_to=upload_to_habilidad, blank=True, null=True)
    created_at = models.DateTimeField(_("Creado en"), auto_now_add=True)
    modified_at = models.DateTimeField(_("Modificado en"), auto_now=True)
    
    class Meta:
        verbose_name = _("Habilidad")
        verbose_name_plural = _("Habilidades")
        ordering = ["-created_at"]
    
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_slug(self.nombre)
        # Verificar si el slug ya existe y agregar un sufijo si es necesario
        base_slug = self.slug
        counter = 1
        while Habilidad.objects.filter(slug=self.slug).exists(): 
            self.slug = f"{base_slug}-{counter}"
            counter += 1
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.nombre}"
    
class Proyecto(BaseSEO, models.Model):
    """
    Modelo para representar un proyecto de un usuario, incluyendo su nombre, descripción,
    tecnologías utilizadas, y enlaces al proyecto en línea o demostraciones.

    Hereda de `BaseSEO` para incluir metadatos SEO relacionados con el proyecto.

    Attributes:
        id (UUIDField): Identificador único del proyecto.
        slug (SlugField): Slug generado para la URL del proyecto.
        nombre (CharField): Nombre del proyecto.
        title (CharField): Título SEO del proyecto.
        perfil (ForeignKey): Relación con el perfil del usuario.
        url_proyecto (URLField): URL del proyecto.
        url_proyecto_demo (URLField): URL de la demo del proyecto.
        thumbnail (ImageField): Imagen representativa del proyecto.
        tiny (ImageField): Imagen optimizada para dispositivos móviles.
        descripcion (CKEditor5Field): Descripción enriquecida del proyecto.
        texto_enriquecido (CKEditor5Field): Texto adicional enriquecido.
        habilidades (ManyToManyField): Habilidades asociadas al proyecto.
        created_at (DateTimeField): Fecha de creación del proyecto.
        modified_at (DateTimeField): Fecha de la última modificación.
    """
    TIPOS_PROYECTO = (
        ("web", "Web"),
        ("app", "Aplicación web"),
        ("desktop", "Aplicación de escritorio"),
        ("otro", "Otro"),
    )
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(_("Slug"), unique=True, max_length=128)
    nombre = models.CharField(_("Nombre del proyecto"), max_length=100)
    title = models.CharField(max_length=128, blank=True, null=True)
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE, related_name="proyectos")
    url_proyecto = models.URLField(_("URL del proyecto"), max_length=200, blank=True, null=True)
    url_proyecto_demo = models.URLField(_("URL demo del proyecto"), max_length=200, blank=True, null=True)
    thumbnail = models.ImageField(_("Imagen de proyecto"), upload_to=upload_to_proyecto, blank=True, null=True)
    tiny = models.ImageField(_("Imagen de proyecto para móvil"), upload_to=upload_to_proyecto, blank=True, null=True)

    introduccion = models.TextField(_("Introducción"), max_length=300, blank=True)
    descripcion = models.TextField(_("Descripción"))
    texto_enriquecido = CKEditor5Field(_('Texto enriquecido'), config_name='extends', null=True, blank=True)

    tipo = models.CharField(_("Tipos de proyectos"), max_length=20, choices=TIPOS_PROYECTO, default="app")

    habilidades = models.ManyToManyField("Habilidad", verbose_name=_("Habilidades"))
    empresas = models.ManyToManyField("Empresa", related_name="proyectos", blank=True, verbose_name=_("Empresa"))

    created_at = models.DateTimeField(_("Creado en"), auto_now_add=True)
    modified_at = models.DateTimeField(_("Modificado en"), auto_now=True)

    class Meta:
        verbose_name = _("Proyecto")
        verbose_name_plural = _("Proyectos")
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_slug(self.nombre)
        base_slug = self.slug
        counter = 1
        while Proyecto.objects.filter(slug=self.slug).exists():
            self.slug = f"{base_slug}-{counter}"
            counter += 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nombre}"
    
class Empresa(models.Model):
    """
    Modelo para representar una empresa con su nombre, logo, descripción y website.

    Attributes:
        nombre (CharField): Nombre de la empresa.
        logo (ImageField): Logo de la empresa.
        descripcion (TextField): Descripción de la empresa.
        website (URLField): Enlace al sitio web de la empresa.
    """
    nombre = models.CharField(max_length=255, unique=True)
    logo = models.ImageField(upload_to=upload_to_empresa, blank=True, null=True)
    descripcion = models.TextField()
    website = models.URLField(blank=True)

    def __str__(self):
        return self.nombre

class Experiencia(models.Model):
    """
    Modelo que representa una experiencia laboral de un usuario en una empresa, incluyendo
    el puesto, las fechas de inicio y fin, y una descripción detallada.

    Attributes:
        id (UUIDField): Identificador único de la experiencia.
        slug (SlugField): Slug generado para la URL de la experiencia.
        perfil (ForeignKey): Relación con el perfil del usuario.
        empresa (ForeignKey): Relación con la empresa.
        puesto (CharField): Puesto desempeñado en la empresa.
        fecha_inicio (DateField): Fecha de inicio del puesto.
        fecha_fin (DateField): Fecha de finalización del puesto.
        descripcion (CKEditor5Field): Descripción de las responsabilidades del puesto.
        created_at (DateTimeField): Fecha de creación de la experiencia.
        modified_at (DateTimeField): Fecha de la última modificación.
    """
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(_("Slug"), unique=True, max_length=128)
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE, related_name="experiencias")
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='experiencias')
    habilidades = models.ManyToManyField(Habilidad, related_name="experiencias", blank=True)
    puesto = models.CharField(_("Puesto"), max_length=100)
    fecha_inicio = models.DateField(_("Fecha de inicio"))
    fecha_fin = models.DateField(_("Fecha de finalización"), blank=True, null=True)
    descripcion = CKEditor5Field(_("Descripción del puesto"), config_name="extends")
    created_at = models.DateTimeField(_("Creado en"), auto_now_add=True)
    modified_at = models.DateTimeField(_("Modificado en"), auto_now=True)
    
    class Meta:
        verbose_name = _("Experiencia")
        verbose_name_plural = _("Experiencias")
        ordering = ["-created_at"]
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_slug(self.puesto, self.empresa.nombre)
        # Verificar si el slug ya existe y agregar un sufijo si es necesario
        base_slug = self.slug
        counter = 1
        while Experiencia.objects.filter(slug=self.slug).exists():
            self.slug = f"{base_slug}-{counter}"
            counter += 1
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.puesto} en {self.empresa}"
    def is_current(self):
        return self.fecha_fin is None or self.fecha_fin > now().date()

class Educacion(models.Model):
    """
    Modelo que representa una titulación o educación formal de un usuario, incluyendo
    la institución, el título obtenido, y las fechas de inicio y fin.

    Attributes:
        id (UUIDField): Identificador único de la educación.
        slug (SlugField): Slug generado para la URL de la titulación.
        institucion (CharField): Nombre de la institución educativa.
        titulo (CharField): Título obtenido.
        perfil (ForeignKey): Relación con el perfil del usuario.
        fecha_inicio (DateField): Fecha de inicio de los estudios.
        fecha_fin (DateField): Fecha de finalización de los estudios.
        descripcion (CKEditor5Field): Descripción de los estudios.
        thumbnail_titulo (ImageField): Imagen asociada al título obtenido.
        created_at (DateTimeField): Fecha de creación de la educación.
        modified_at (DateTimeField): Fecha de la última modificación.
    """
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    slug = models.SlugField(_("Slug"), unique=True, max_length=128)
    institucion = models.CharField(_("Institución"), max_length=100)
    titulo = models.CharField(_("Título"), max_length=100)
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE, related_name="titulaciones")
    fecha_inicio = models.DateField(_("Fecha de inicio"))
    fecha_fin = models.DateField(_("Fecha de finalización"), blank=True, null=True) #Si fecha fin es null, es el puesto actual.
    descripcion = CKEditor5Field(_("Descripción"), config_name="extends", blank=True, null=True)
    thumbnail_titulo = models.ImageField(_("Imagen del título"), upload_to=upload_to_titulo, blank=True, null=True)
    created_at = models.DateTimeField(_("Creado en"), auto_now_add=True)
    modified_at = models.DateTimeField(_("Modificado en"), auto_now=True)
    
    class Meta:
        verbose_name = _("Educacion")
        verbose_name_plural = _("Titulaciones")
        ordering = ["-created_at"]
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = generate_slug(self.titulo)
        # Verificar si el slug ya existe y agregar un sufijo si es necesario
        base_slug = self.slug
        counter = 1
        while Educacion.objects.filter(slug=self.slug).exists():
            self.slug = f"{base_slug}-{counter}"
            counter += 1
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.titulo} en {self.institucion}"
    def is_current(self):
        return self.fecha_fin is None or self.fecha_fin > now().date()
