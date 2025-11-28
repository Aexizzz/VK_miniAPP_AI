from typing import Any, Dict, List, Optional

from django.conf import settings
from django.http import HttpRequest

from .vk_client import VKAPIError, VKClient

DEFAULT_IMAGE = "https://vk.com/images/camera_200.png"


def _build_link(prefix: str, owner_id: Any, item_id: Any) -> str:
    return f"https://vk.com/{prefix}{owner_id}_{item_id}"


def get_vk_client(request: HttpRequest) -> VKClient:
    """
    VK token can be provided via:
    - X-Vk-Access-Token header (from the mini app launch params)
    - access_token query param
    - VK_SERVICE_TOKEN / VK_USER_TOKEN environment variables
    """
    token = request.headers.get("X-Vk-Access-Token") or request.GET.get("access_token")
    return VKClient(token=token, api_version=getattr(settings, "VK_API_VERSION", "5.199"))


class ContentService:
    def __init__(self, client: VKClient):
        self.client = client

    def get_profile(self, user_id: Optional[str] = None) -> Dict[str, Any]:
        if not self.client.has_token:
            return {
                "id": 0,
                "first_name": "Guest",
                "last_name": "User",
                "photo_200": DEFAULT_IMAGE,
            }

        params = {"fields": "photo_200"}
        if user_id:
            params["user_ids"] = user_id

        try:
            response = self.client.call("users.get", params=params)
            payload = response[0] if isinstance(response, list) else response.get("items", [{}])[0]
            return {
                "id": payload.get("id", 0),
                "first_name": payload.get("first_name", ""),
                "last_name": payload.get("last_name", ""),
                "photo_200": payload.get("photo_200", DEFAULT_IMAGE),
            }
        except (VKAPIError, KeyError, IndexError):
            return {
                "id": 0,
                "first_name": "Unknown",
                "last_name": "User",
                "photo_200": DEFAULT_IMAGE,
            }

    def get_sections(self) -> List[Dict[str, Any]]:
        return [
            {"slug": slug, "title": meta["title"], "items": meta["handler"]()}
            for slug, meta in self._section_map().items()
        ]

    def get_section(self, slug: str) -> Optional[Dict[str, Any]]:
        section = self._section_map().get(slug)
        if not section:
            return None
        return {"slug": slug, "title": section["title"], "items": section["handler"]()}

    def _section_map(self) -> Dict[str, Dict[str, Any]]:
        return {
            "music": {"title": "Music", "handler": self.get_music},
            "video": {"title": "Video", "handler": self.get_videos},
            "podcast": {"title": "Podcasts", "handler": self.get_podcasts},
            "community": {"title": "Communities", "handler": self.get_groups},
            "games": {"title": "Games", "handler": self.get_games},
            "friends": {"title": "Friends", "handler": self.get_users},
        }

    def get_music(self) -> List[Dict[str, Any]]:
        if not self.client.has_token:
            return self._fallback("music")

        try:
            response = self.client.call("audio.getPopular", {"count": 6})
            items = response.get("items", [])
            parsed: List[Dict[str, Any]] = []
            for item in items:
                cover = (
                    item.get("album", {})
                    .get("thumb", {})
                    .get("photo_300", "")
                ) or DEFAULT_IMAGE
                parsed.append(
                    {
                        "id": str(item.get("id")),
                        "title": item.get("title", "Track"),
                        "subtitle": item.get("artist", "Unknown"),
                        "cover": cover,
                        "avatar": cover,
                        "itemLink": _build_link("audio", item.get("owner_id", ""), item.get("id", "")),
                    }
                )
            if parsed:
                return parsed
        except VKAPIError:
            pass
        return self._fallback("music")

    def get_videos(self) -> List[Dict[str, Any]]:
        if not self.client.has_token:
            return self._fallback("video")

        try:
            response = self.client.call("video.search", {"q": "popular", "count": 6})
            items = response.get("items", [])
            parsed: List[Dict[str, Any]] = []
            for item in items:
                cover = item.get("photo_320") or item.get("first_frame_320") or DEFAULT_IMAGE
                parsed.append(
                    {
                        "id": str(item.get("id")),
                        "title": item.get("title", "Video"),
                        "subtitle": (item.get("description") or "")[:80],
                        "cover": cover,
                        "avatar": cover,
                        "itemLink": _build_link("video", item.get("owner_id", ""), item.get("id", "")),
                    }
                )
            if parsed:
                return parsed
        except VKAPIError:
            pass
        return self._fallback("video")

    def get_podcasts(self) -> List[Dict[str, Any]]:
        # Podcasts API is limited; we rely on search + fallback.
        if self.client.has_token:
            try:
                response = self.client.call("newsfeed.search", {"q": "podcast", "count": 6})
                items = response.get("items", [])
                parsed: List[Dict[str, Any]] = []
                for item in items:
                    parsed.append(
                        {
                            "id": str(item.get("post_id", item.get("id", ""))),
                            "title": item.get("text", "Podcast"),
                            "subtitle": "Podcast suggestion",
                            "cover": DEFAULT_IMAGE,
                            "avatar": DEFAULT_IMAGE,
                            "itemLink": f"https://vk.com/wall{item.get('owner_id', '')}_{item.get('id', '')}",
                        }
                    )
                if parsed:
                    return parsed
            except VKAPIError:
                pass
        return self._fallback("podcast")

    def get_groups(self) -> List[Dict[str, Any]]:
        if not self.client.has_token:
            return self._fallback("community")

        try:
            response = self.client.call("groups.search", {"q": "vk", "count": 6})
            items = response.get("items", [])
            parsed: List[Dict[str, Any]] = []
            for item in items:
                screen_name = item.get("screen_name") or f"public{item.get('id')}"
                cover = item.get("photo_200") or DEFAULT_IMAGE
                parsed.append(
                    {
                        "id": str(item.get("id")),
                        "title": item.get("name", "Community"),
                        "subtitle": screen_name,
                        "cover": cover,
                        "avatar": cover,
                        "itemLink": f"https://vk.com/{screen_name}",
                    }
                )
            if parsed:
                return parsed
        except VKAPIError:
            pass
        return self._fallback("community")

    def get_games(self) -> List[Dict[str, Any]]:
        if not self.client.has_token:
            return self._fallback("games")

        try:
            response = self.client.call("apps.get", {"count": 6, "platform": "mobile"})
            items = response.get("items", [])
            parsed: List[Dict[str, Any]] = []
            for item in items:
                cover = item.get("icon_150") or item.get("icon_75") or DEFAULT_IMAGE
                parsed.append(
                    {
                        "id": str(item.get("id")),
                        "title": item.get("title", "Game"),
                        "subtitle": item.get("genre", "Game"),
                        "cover": cover,
                        "avatar": cover,
                        "itemLink": item.get("author_url") or f"https://vk.com/app{item.get('id')}",
                    }
                )
            if parsed:
                return parsed
        except VKAPIError:
            pass
        return self._fallback("games")

    def get_users(self) -> List[Dict[str, Any]]:
        if not self.client.has_token:
            return self._fallback("friends")

        try:
            response = self.client.call("users.search", {"q": "vk", "count": 6, "fields": "photo_200"})
            items = response.get("items", [])
            parsed: List[Dict[str, Any]] = []
            for item in items:
                cover = item.get("photo_200") or DEFAULT_IMAGE
                parsed.append(
                    {
                        "id": str(item.get("id")),
                        "title": f"{item.get('first_name', '')} {item.get('last_name', '')}".strip(),
                        "subtitle": "VK user",
                        "cover": cover,
                        "avatar": cover,
                        "itemLink": f"https://vk.com/id{item.get('id')}",
                    }
                )
            if parsed:
                return parsed
        except VKAPIError:
            pass
        return self._fallback("friends")

    def _fallback(self, section: str) -> List[Dict[str, Any]]:
        placeholders = {
            "music": [
                {"id": "m1", "title": "Song A", "subtitle": "Artist", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
                {"id": "m2", "title": "Song B", "subtitle": "Artist", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
            ],
            "video": [
                {"id": "v1", "title": "Video A", "subtitle": "Short description", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
                {"id": "v2", "title": "Video B", "subtitle": "Short description", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
            ],
            "podcast": [
                {"id": "p1", "title": "Podcast A", "subtitle": "Episode", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
                {"id": "p2", "title": "Podcast B", "subtitle": "Episode", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
            ],
            "community": [
                {"id": "c1", "title": "Community A", "subtitle": "vk.com/community_a", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
                {"id": "c2", "title": "Community B", "subtitle": "vk.com/community_b", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
            ],
            "games": [
                {"id": "g1", "title": "Game A", "subtitle": "Genre", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
                {"id": "g2", "title": "Game B", "subtitle": "Genre", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
            ],
            "friends": [
                {"id": "f1", "title": "VK Friend", "subtitle": "vk.com/id0", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
                {"id": "f2", "title": "VK Friend", "subtitle": "vk.com/id1", "cover": DEFAULT_IMAGE, "avatar": DEFAULT_IMAGE, "itemLink": "#"},
            ],
        }
        return placeholders.get(section, [])
