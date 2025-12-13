import { Injectable, Logger } from '@nestjs/common';

type VkUserResponse = {
  id: number;
  followers_count?: number;
  photo_200?: string;
  counters?: {
    videos?: number;
    photos?: number;
    friends?: number;
    groups?: number;
  };
};

@Injectable()
export class VkService {
  private readonly logger = new Logger(VkService.name);
  private readonly apiUrl = 'https://api.vk.com/method';
  private readonly token = process.env.VK_SERVICE_TOKEN;
  private readonly apiVersion = process.env.VK_API_VERSION || '5.199';

  get isEnabled() {
    return Boolean(this.token);
  }

  async fetchUser(vkUserId: number): Promise<VkUserResponse | null> {
    if (!this.token) {
      this.logger.warn('VK_SERVICE_TOKEN is not set, skipping VK API call');
      return null;
    }

    const params = new URLSearchParams({
      user_ids: vkUserId.toString(),
      access_token: this.token,
      v: this.apiVersion,
      fields: 'followers_count,counters,photo_200',
    });

    const url = `${this.apiUrl}/users.get?${params.toString()}`;

    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) {
      this.logger.warn(`VK users.get failed with status ${res.status}`);
      return null;
    }

    const data = (await res.json()) as {
      response?: VkUserResponse[];
      error?: { error_msg: string };
    };

    if (!data.response || data.response.length === 0) {
      this.logger.warn(`VK users.get returned no data: ${JSON.stringify(data.error)}`);
      return null;
    }

    return data.response[0];
  }
}
