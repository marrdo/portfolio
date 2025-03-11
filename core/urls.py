from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from .views import ApiGeneralView


urlpatterns = [
    path('api/blog/', include('apps.blog.urls')),
    path("api/curriculum/", include('apps.curriculum.urls')),
    path('admin/', admin.site.urls),
    path("ckeditor5/", include('django_ckeditor_5.urls')),
]+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)