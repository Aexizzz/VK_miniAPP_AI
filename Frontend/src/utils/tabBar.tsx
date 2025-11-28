import React from "react";
import {
  Icon24LightbulbStarOutline,
  Icon24UserCircleOutline,
  Icon24LogoVkVideoOutline,
  Icon24LogoVkMusicOutline,
  Icon24PodcastOutline,
  Icon24Users3Outline,
  Icon24GameOutline,
  Icon24UsersOutline
} from "@vkontakte/icons";

export type TabItem = {
  id: number;
  name: string;
  label: string;
  icon: React.ReactNode;
  enabled: boolean;
};

// Фиксированные вкладки
export const baseTabs: TabItem[] = [
  {
    id: 1,
    name: "",
    label: "Главная",
    icon: <Icon24LightbulbStarOutline />,
    enabled: true,
  },
  {
    id: 999,
    name: "settings",
    label: "Профиль",
    icon: <Icon24UserCircleOutline />,
    enabled: true,
  },
];

// Динамические вкладки
export const dynamicTabs: TabItem[] = [
  {
    id: 2,
    name: "video",
    label: "Видео",
    icon: <Icon24LogoVkVideoOutline />,
    enabled: true,
  },
  {
    id: 3,
    name: "music",
    label: "Музыка",
    icon: <Icon24LogoVkMusicOutline />,
    enabled: true,
  },
  {
    id: 4,
    name: "podcast",
    label: "Подкасты",
    icon: <Icon24PodcastOutline />,
    enabled: false,
  },
  {
    id: 5,
    name: "community",
    label: "Сообщества",
    icon: <Icon24Users3Outline />,
    enabled: false,
  },
  {
    id: 6,
    name: "games",
    label: "Игры",
    icon: <Icon24GameOutline />,
    enabled: false,
  },
  {
    id: 7,
    name: "friends",
    label: "Друзья",
    icon: <Icon24UsersOutline />,
    enabled: false,
  },
];

// Получение текущих вкладок для TabBar
export function getTabBarTabs(): TabItem[] {
  return [
    baseTabs[0], // Главная всегда первая
    ...dynamicTabs.filter((t) => t.enabled),
    baseTabs[1], // Профиль всегда последний
  ];
}

// Загрузка состояния из localStorage
export function loadTabsFromStorage() {
  const saved = localStorage.getItem('tabbar_state');
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    dynamicTabs.forEach(tab => {
      const savedTab = parsed.find((t: any) => t.name === tab.name);
      if (savedTab) {
        tab.enabled = savedTab.enabled;
      }
    });
  } catch (e) {
    console.error('Ошибка загрузки настроек панели:', e);
  }
}

// Сохранение состояния в localStorage
function saveTabsToStorage() {
  const state = dynamicTabs.map(t => ({ 
    name: t.name, 
    enabled: t.enabled 
  }));
  localStorage.setItem('tabbar_state', JSON.stringify(state));
}

// Переключение вкладки
export function toggleTab(name: string) {
  const tab = dynamicTabs.find((t) => t.name === name);
  if (tab) {
    tab.enabled = !tab.enabled;
    saveTabsToStorage();
  }
}