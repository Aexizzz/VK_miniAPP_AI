import os
from typing import Any, Dict, Optional

import requests
from django.conf import settings


class VKAPIError(Exception):
    """Raised when VK API returns an error or invalid response."""


class VKClient:
    base_url = "https://api.vk.com/method"

    def __init__(self, token: Optional[str] = None, api_version: Optional[str] = None):
        self.token = token or os.getenv("VK_SERVICE_TOKEN") or os.getenv("VK_USER_TOKEN")
        self.api_version = api_version or getattr(settings, "VK_API_VERSION", "5.199")

    @property
    def has_token(self) -> bool:
        return bool(self.token)

    def call(self, method: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        if not self.token:
            raise VKAPIError("VK access token is not configured.")

        payload: Dict[str, Any] = {
            "access_token": self.token,
            "v": self.api_version,
        }
        if params:
            payload.update(params)

        response = requests.get(f"{self.base_url}/{method}", params=payload, timeout=6)
        response.raise_for_status()
        data = response.json()

        if "error" in data:
            error = data["error"]
            raise VKAPIError(error.get("error_msg") or "Unknown VK API error")

        return data.get("response", {})
