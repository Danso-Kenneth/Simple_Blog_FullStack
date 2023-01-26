from django.shortcuts import render
from rest_framework import generics
from .serializers import PostSerializer
from .models import Post
from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated, SAFE_METHODS


class PostUserWritePermission(BasePermission):
    message = 'Editing of Post can only be made by author of the post'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
