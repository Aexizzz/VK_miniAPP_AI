import { useEffect, useState } from 'react';
import connect from '@vkontakte/vk-bridge';
import { fetchProfile } from '../utils/api';

interface VkUser {
  id: number;
  first_name: string;
  last_name: string;
  photo_200: string;
}

interface UseVkUserResult {
  userInfo: VkUser | null;
  isLoading: boolean;
  error: Error | null;
}

// Fetches profile from backend first, falls back to VK bridge if needed.
export function useVkUser(): UseVkUserResult {
  const [userInfo, setUserInfo] = useState<VkUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUserInfo = async () => {
      try {
        const profile = await fetchProfile();
        if (!cancelled) {
          setUserInfo(profile);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      }

      try {
        const userData = await connect.send('VKWebAppGetUserInfo', {}) as VkUser;
        if (!cancelled) {
          setUserInfo(userData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchUserInfo();

    return () => {
      cancelled = true;
    };
  }, []);

  return { userInfo, isLoading, error };
}
