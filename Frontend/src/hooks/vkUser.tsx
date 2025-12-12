import { useState, useEffect } from 'react'
import connect from '@vkontakte/vk-bridge'
import { syncUser } from '../utils/api'

interface VkUser {
  id: number;
  first_name: string
  last_name: string
  photo_200: string
}

interface UseVkUserResult {
  userInfo: VkUser | null
  isLoading: boolean
  error: Error | null
}

// Пользовательский хук для получения данных пользователя ВК.
export function useVkUser(): UseVkUserResult {
  const [userInfo, setUserInfo] = useState<VkUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const userData = await connect.send('VKWebAppGetUserInfo', {}) as VkUser
        setUserInfo(userData)
        await syncUser({
          vkUserId: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          avatarUrl: userData.photo_200,
        })
        setIsLoading(false)
      } catch (err) {
        if (err instanceof Error) {
            setError(err)
        } else {
            setError(new Error(String(err)))
        }
        setIsLoading(false)
      }
    }
    fetchUserInfo()
  }, []);

  return { userInfo, isLoading, error }
}
