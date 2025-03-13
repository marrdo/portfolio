from django.contrib import admin
from .models import Perfil, Habilidad, Proyecto, Empresa, Experiencia, Educacion

@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ('dni', 'nombre', 'apellido_1', 'apellido_2', 'email', 'telefono', 'fecha_nacimiento')  
    search_fields = ('dni', 'nombre', 'apellido_1', 'email')
    list_filter = ('fecha_nacimiento', 'nombre', 'dni')
    ordering = ('-dni',)  # Aseguramos que ordering sea una tupla
    list_editable = ('apellido_2', 'telefono')
    prepopulated_fields = {'slug': ('nombre', 'apellido_1',)}
    fieldsets = (
        ('Información Personal', {
            'fields': ('dni', 'nombre', 'apellido_1', 'apellido_2', 'email', 'telefono', 'fecha_nacimiento', 'slug')
        }),
        ('Redes Sociales', {
            'fields': ('linkedin', 'facebook', 'twitter', 'instagram', 'github', 'web_personal')
        }),
        ('Dirección y Multimedia', {
            'fields': ('direccion', 'thumbnail', 'tiny')
        }),
        ('Fechas', {
            'fields': ('created_at', 'modified_at')
        }),
    )

    readonly_fields = ('created_at', 'modified_at')  # Evitar edición manual en fechas


@admin.register(Habilidad)
class HabilidadAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'perfil', 'thumbnail', 'tiny', 'created_at', 'modified_at')
    search_fields = ('nombre', 'perfil__nombre')  
    list_filter = ('nombre',)  
    ordering = ('nombre',)  
    readonly_fields = ('created_at', 'modified_at')
    prepopulated_fields = {'slug': ('nombre',)}
    fieldsets = (
        ('Información General', {
            'fields': ('nombre', 'perfil', 'slug')
        }),
        ('Imágenes', {
            'fields': ('thumbnail', 'tiny')
        }),
        ('Fechas', {
            'fields': ('created_at', 'modified_at'),
            'classes': ('collapse',),
        }),
    )

@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'perfil', 'url_proyecto', 'url_proyecto_demo', 'created_at', 'modified_at')
    search_fields = ('nombre', 'perfil__nombre')  
    list_filter = ('nombre',)  
    ordering = ('nombre',)  
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'modified_at')
    filter_horizontal = ('habilidades',)  
    prepopulated_fields = {'slug': ('nombre',)}
    fieldsets = (
        ('Detalles del Proyecto', {
            'fields': ('nombre', 'slug', 'title', 'perfil', 'descripcion', 'texto_enriquecido', 'habilidades')
        }),
        ('Imágenes', {
            'fields': ('thumbnail', 'tiny'),
        }),
        ('URLs', {
            'fields': ('url_proyecto', 'url_proyecto_demo'),
        }),
        ('Fechas', {
            'fields': ('created_at', 'modified_at'),
            'classes': ('collapse',),
        }),
    )

@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'website')
    search_fields = ('nombre',)
    ordering = ('nombre',)
    fieldsets = (
        ('Información de la Empresa', {
            'fields': ('nombre', 'descripcion', 'website', 'logo')
        }),
    )

@admin.register(Experiencia)
class ExperienciaAdmin(admin.ModelAdmin):
    list_display = ("perfil", "empresa", "puesto", "fecha_inicio", "fecha_fin", "created_at", "modified_at")
    search_fields = ("puesto", "empresa__nombre", "perfil__nombre")
    ordering = ("-fecha_inicio",)
    readonly_fields = ("created_at", "modified_at")
    prepopulated_fields = {"slug": ("puesto", "empresa")}
    filter_horizontal = ("habilidades",)  

    fieldsets = (
        ("Datos de la Experiencia", {
            "fields": ("perfil", "empresa", "puesto", "slug", "descripcion", "habilidades")
        }),
        ("Fechas", {
            "fields": ("fecha_inicio", "fecha_fin", "created_at", "modified_at")
        }),
    )

@admin.register(Educacion)
class EducacionAdmin(admin.ModelAdmin):
    list_display = ('institucion', 'titulo', 'perfil', 'fecha_inicio', 'fecha_fin',)
    search_fields = ('titulo',)
    ordering = ('-fecha_inicio',)
    prepopulated_fields = {'slug': ('titulo',)}
    fieldsets = (
        ('Información de titulación', {
            'fields': ('institucion', 'titulo', 'perfil', 'descripcion', 'slug')
        }),
        ('Imágenes de títulos', {
            'fields': ('thumbnail_titulo',),
        }),
        ('Fechas', {
            'fields': ('fecha_inicio', 'fecha_fin'),
            'classes': ('collapse',),
        }),
    )