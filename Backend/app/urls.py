from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProfileView, SectionViewSet

router = DefaultRouter()
router.register(r"sections", SectionViewSet, basename="sections")

urlpatterns = [
    path("profile/", ProfileView.as_view(), name="profile"),
    path("", include(router.urls)),
]
