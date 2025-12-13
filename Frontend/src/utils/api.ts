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

export async function getContentGrouped(): Promise<GroupedContent> {
  return request<GroupedContent>('/content');
}

export async function getContentByType(
  type: string,
): Promise<ApiContentItem[]> {
  return request<ApiContentItem[]>(`/content?type=${type}`);
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
