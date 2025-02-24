from django.contrib import admin
from .models import Post, Category, Heading
# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'status', 'created_on')
    list_filter = ("status",)
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'parent', 'slug')
    search_fields = ['name', 'title','description', 'slug']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ("parent",)
    ordering = ['name',]