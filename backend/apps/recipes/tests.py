from django.test import TestCase
from apps.recipes.models import Recipe
from django.contrib.auth.models import User

class TaskTestCase(TestCase):
    def setUp(self):

        test_user = User()
        test_user.id = 1
        try:
            test_user.username = "username"

        except Exception, e:
            print e
            test_user.username = "failoveruser"

        test_user.first_name = "first name"
        test_user.email = "email@email.email"

        test_user.save()

        Recipe.objects.create(name_of_recipe="test recipe",
                              description="test description",
                              directions="test directions",
                              owner=test_user)

    def test_recipe_creation(self):

        test_user = User.objects.get(id=1)

        test_recipe = Recipe.objects.get(name_of_recipe="test recipe")
        self.assertEqual(test_recipe.name_of_recipe, "test recipe")

    def AccountTest(APITestCase):
        def test_api_recipe_create(self):
            pass






