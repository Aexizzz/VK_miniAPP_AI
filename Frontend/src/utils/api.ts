export type CardItem = {
  id: string | number;
  title: string;
  subtitle: string;
  cover: string;
  avatar?: string;
  itemLink: string;
};

export type Section = {
  slug: string;
  title: string;
  items: CardItem[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

async function apiFetch<T>(path: string, token?: string): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, "")}/api/${path}`;
  const headers: Record<string, string> = {};
  if (token) {
    headers["X-Vk-Access-Token"] = token;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchProfile(token?: string) {
  return apiFetch<{ id: number; first_name: string; last_name: string; photo_200: string }>(
    "profile/",
    token
  );
}

export async function fetchSections(token?: string): Promise<Section[]> {
  const data = await apiFetch<{ sections: Section[] }>("sections/", token);
  return data.sections ?? [];
}
