from django.contrib import admin
from django.urls import path, re_path
from api import views

urlpatterns = [
    path('api/auth/', views.AuthView.as_view()),
    path('api/users/', views.UserListView.as_view()),
    path('api/caretakers/', views.CareTakersView.as_view()),
    re_path('^api/caretaker/(.*?)/$', views.CareTakerView.as_view()),
    re_path('^api/caretaker_enroll/(.*?)/$', views.CareTakerEnRollView.as_view()),
    path('api/questions/', views.QuestionListView.as_view()),
    re_path('^api/question/(.*?)/$', views.QuestionView.as_view()),
    re_path('^api/user/(.*?)/$', views.UserView.as_view()),
    path('admin/', admin.site.urls),
]
