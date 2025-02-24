from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Post, Category
from .serializers import PostSerializer, CategorySerializer, PostListSerializer

class PostListView(ListAPIView):
    queryset = Post.postobjects.all()
    serializer_class = PostListSerializer
class PostDetailView(RetrieveAPIView):
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer
    lookup_field = "slug"