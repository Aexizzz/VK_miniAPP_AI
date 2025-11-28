from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ProfileSerializer, SectionSerializer
from .services import ContentService, get_vk_client


class ProfileView(APIView):
    """
    Minimal endpoint that mirrors VK WebApp user payload and works
    as a backend alternative to the bridge call.
    """

    def get(self, request):
        client = get_vk_client(request)
        service = ContentService(client)
        profile = service.get_profile(user_id=request.query_params.get("user_id"))
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SectionViewSet(viewsets.ViewSet):
    """
    Returns content for the cards used on the frontend (music, video, etc.).
    Allows requesting the entire set or a single section by slug.
    """

    def list(self, request):
        client = get_vk_client(request)
        service = ContentService(client)
        sections = service.get_sections()
        serializer = SectionSerializer(sections, many=True)
        return Response({"sections": serializer.data}, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        client = get_vk_client(request)
        service = ContentService(client)
        section = service.get_section(slug=pk)
        if not section:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = SectionSerializer(section)
        return Response(serializer.data, status=status.HTTP_200_OK)
