from rest_framework import generics
from models import Recipe
from rest_framework.permissions import IsAuthenticated
from serializers import UserSerializer, RecipeSerializer


class UserRegistration(generics.CreateAPIView):
    serializer_class = UserSerializer


class GetUserInfo(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()


class AddRecipe(generics.CreateAPIView):
    serializer_class = RecipeSerializer

