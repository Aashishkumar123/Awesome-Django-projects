from django.urls import path
from main import views

urlpatterns = [
    path("", views.index, name="index"),
    path("submit-list/", views.submitLits, name="submit-list"),
    path("delete-list/<int:id>/", views.deleteList, name="delete-list"),
    path("edit-list/<int:id>/", views.editList, name="edit-list"),
]
