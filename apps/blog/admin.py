from django.contrib import admin
from .models import Post, Category, Heading
# Register your models here.

class HeadingInline(admin.TabularInline):
    model = Heading
    extra = 1
    fields = ('title', 'level', 'order', 'slug')
    prepopulated_fields = {'slug' : ('title',)}
    ordering = ('order',)
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'parent', 'slug')
    search_fields = ['name', 'title','description', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ("parent",)
    ordering = ['name',]
@admin.register(Post)    
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'category','created_at', 'update_at')
    search_fields = ['title', 'description', 'content', 'keywords', 'slug']
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ("status", 'category', 'update_at')
    ordering = ('-created_at',)
    readonly_fields = ('id', 'created_at', 'update_at')
    fieldsets = (
        ("Información general", {
            "fields": (
                'title',
                'description',
                'content',
                'thumbnail',
                'keywords',
                'slug',
                'category',
            ),
        }),
        ('Status & fehcas', {
            'fields' : ('status', 'created_at', 'update_at')
        })
    )
    inlines = [HeadingInline]
@admin.register(Heading)
class HeadingModel(admin.ModelAdmin):
    list_display = ('title', 'post','level', 'order')
    search_fields = ('title', 'post_title')
    list_filter = ('level', 'post')
    ordering = ('post', 'order')
    prepopulated_fields = {'slug' : ('title',)}
    
