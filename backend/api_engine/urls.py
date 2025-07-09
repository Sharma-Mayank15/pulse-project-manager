from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from accounts.views import (
    LogoutView,
    LoginView,
    RegistrationView,
    UserRetrieveUpdateDestroyView,
)
from projects.views import (
    ProjectListCreateAPIView,
    ProjectRetrieveUpdateDestroyAPIView,
)
from tasks.views import TaskListCreateAPIView, TaskRetrieveUpdateDestroyAPIView

urlpatterns = [
    path("register/", RegistrationView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "users/<int:pk>/",
        UserRetrieveUpdateDestroyView.as_view(),
        name="user-detail",
    ),
    path(
        "projects/",
        ProjectListCreateAPIView.as_view(),
        name="project-list-create",
    ),
    path(
        "projects/<uuid:pk>/",
        ProjectRetrieveUpdateDestroyAPIView.as_view(),
        name="project-detail",
    ),
    path(
        "projects/<uuid:pk>/tasks/",
        TaskListCreateAPIView.as_view(),
        name="task-list-create",
    ),
    path(
        "tasks/<uuid:pk>/",
        TaskRetrieveUpdateDestroyAPIView.as_view(),
        name="task-detail",
    ),
]
