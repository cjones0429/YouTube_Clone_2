from django.urls import path
from . import views

urlpatterns = [
    path('replies/', views.RepliesList.as_view()),
    path('replies/<int:pk>/', views.RepliesList.as_view())
]
