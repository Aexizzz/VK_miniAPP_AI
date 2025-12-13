const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  'https://24ritm.ru';

const jsonHeaders = { 'Content-Type': 'application/json' };

const buildUrl = (path: string) =>
  `${API_BASE_URL.replace(/\/$/, '')}${path}`;

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(buildUrl(path), {
    ...options,
    headers: { ...jsonHeaders, ...(options.headers || {}) },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status}: ${body}`);
  }

  return res.json() as Promise<T>;
}

function resolveToken(candidate?: string) {
  if (candidate && candidate !== 'undefined' && candidate !== 'null') return candidate;
  const direct = localStorage.getItem('vk_access_token');
  if (direct && direct !== 'undefined' && direct !== 'null') return direct;

  // ищем web_token от VK Bridge
  const tokens: string[] = [];
  Object.keys(localStorage).forEach((key) => {
    if (key.endsWith(':web_token:login:auth')) {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        const tok = parsed?.access_token || parsed?.data?.access_token;
        if (tok) tokens.push(tok);
      } catch {
        tokens.push(raw);
      }
    }
  });
  return tokens.find(
    (t) => t && t !== 'undefined' && t !== 'null',
  );
}

export type ApiStatistics = {
  views: number;
  comments: number;
  followers: number;
  healthScore: number;
};

export type ApiUser = {
  vkUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  theme: string;
  tabOrder?: string[] | null;
  notificationsEnabled: boolean;
  recommendationsEnabled: boolean;
  statistics?: ApiStatistics;
};

export type ApiContentItem = {
  id: number;
  type: string;
  title: string;
  subtitle?: string | null;
  coverUrl?: string | null;
  avatarUrl?: string | null;
  itemLink?: string | null;
  order: number;
};

export type GroupedContent = Record<string, ApiContentItem[]>;

export async function syncUser(payload: {
  vkUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}): Promise<ApiUser> {
  return request<ApiUser>('/users/sync', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getContentGrouped(
  vkUserId?: number,
  vkAccessToken?: string,
): Promise<GroupedContent> {
  const query = new URLSearchParams();
  if (vkUserId) query.set('vkUserId', vkUserId.toString());
  const token = resolveToken(vkAccessToken);
  if (token) {
    query.set('vkAccessToken', token);
  }
  const suffix = query.toString() ? `?${query.toString()}` : '';
  return request<GroupedContent>(`/content${suffix}`);
}

export async function getContentByType(
  type: string,
  vkUserId?: number,
  vkAccessToken?: string,
): Promise<ApiContentItem[]> {
  const query = new URLSearchParams({ type });
  if (vkUserId) {
    query.set('vkUserId', vkUserId.toString());
  }
  const token = resolveToken(vkAccessToken);
  if (token) {
    query.set('vkAccessToken', token);
  }
  return request<ApiContentItem[]>(`/content?${query.toString()}`);
}

export async function getStatistics(
  vkUserId: number,
): Promise<ApiStatistics> {
  return request<ApiStatistics>(`/users/${vkUserId}/statistics`);
}

export async function updateStatistics(
  vkUserId: number,
  dto: Partial<ApiStatistics>,
): Promise<ApiStatistics> {
  return request<ApiStatistics>(`/users/${vkUserId}/statistics`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}

export async function getSettings(vkUserId: number): Promise<ApiUser> {
  return request<ApiUser>(`/users/${vkUserId}/settings`);
}

export async function updateSettings(
  vkUserId: number,
  dto: Partial<Pick<ApiUser, 'theme' | 'tabOrder'>> & {
    notificationsEnabled?: boolean;
    recommendationsEnabled?: boolean;
  },
): Promise<ApiUser> {
  return request<ApiUser>(`/users/${vkUserId}/settings`, {
    method: 'PATCH',
    body: JSON.stringify(dto),
  });
}
