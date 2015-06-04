from django.conf.urls import url, include
from django.conf import settings
from views import RecipeList, RecipeDetail, AddRecipe, GetUserInfo, UserRegistration
from django.contrib import admin
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    url('^recipes/$', RecipeList.as_view(), name='recipe-list'),
    url('^recipes/(?P<pk>[0-9]+)/$', RecipeDetail.as_view(), name='recipe-detail'),
    url('^add-recipe/$', AddRecipe.as_view(), name='add-recipe'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^obtain-auth-token/', obtain_auth_token),
    url(r'^get-user-info/', GetUserInfo.as_view()),
    url(r'^register-user/', UserRegistration.as_view()),

    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
]