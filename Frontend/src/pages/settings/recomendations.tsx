import { useState, useEffect } from 'react';
// Components
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RowHeader from '../../components/rows/RowHeader/RowHeader';
import Row from '../../components/rows/Row/Row';
// Icons
import {
  Icon24StarsOutline,
  Icon24MusicOutline,
  Icon24VideoSquareOutline,
  Icon24Podcast,
  Icon24Users3Outline,
  Icon24GameOutline,
  Icon24UsersOutline
} from '@vkontakte/icons';

// ===== ЯВНО ОПРЕДЕЛЯЕМ ТИП НАСТРОЕК =====
type RecommendationSettings = {
  music: boolean;
  video: boolean;
  podcast: boolean;
  community: boolean;
  games: boolean;
  friends: boolean;
};
// =====================================

export default function RecomendationsPage() {
  // ===== ИСПОЛЬЗУЕМ ЯВНЫЙ ТИП ДЛЯ СОСТОЯНИЯ =====
  const [settings, setSettings] = useState<RecommendationSettings>(() => {
    const saved = localStorage.getItem('recommendations_settings');
    return saved ? JSON.parse(saved) : {
      music: true,
      video: true,
      podcast: true,
      community: true,
      games: true,
      friends: true
    };
  });
  // =========================================

  useEffect(() => {
    localStorage.setItem('recommendations_settings', JSON.stringify(settings));
  }, [settings]);

  // ===== ИСПРАВЛЕННЫЙ ОБРАБОТЧИК С ЯВНЫМ ТИПОМ =====
  const handleToggle = (section: keyof RecommendationSettings) => {
    setSettings(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  // ============================================

  return (
    <>
      <NavigationBar title='Рекомендации'/>
      
      <RowHeader
        title='Рекомендации'
        subtitle='Ритм анализирует твой стиль — выбери что тебе по душе'
        showIcon
        Icon={<Icon24StarsOutline />}
      />

      <div className="Row-Gropus">
        <div className="Row-Group">
          <Row
            showIcon
            icon={<Icon24MusicOutline />}
            type='Default'
            title='Музыка'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={settings.music}
            switchOnToggle={() => handleToggle('music')}
          />

          <Row
            showIcon
            icon={<Icon24VideoSquareOutline />}
            type='Default'
            title='Видео'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={settings.video}
            switchOnToggle={() => handleToggle('video')}
          />

          <Row
            showIcon
            icon={<Icon24Podcast />}
            type='Default'
            title='Подкасты'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={settings.podcast}
            switchOnToggle={() => handleToggle('podcast')}
          />

          <Row
            showIcon
            icon={<Icon24Users3Outline />}
            type='Default'
            title='Сообщества'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={settings.community}
            switchOnToggle={() => handleToggle('community')}
          />

          <Row
            showIcon
            icon={<Icon24GameOutline />}
            type='Default'
            title='Игры'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={settings.games}
            switchOnToggle={() => handleToggle('games')}
          />

          <Row
            showIcon
            icon={<Icon24UsersOutline />}
            type='Default'
            title='Друзья'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={settings.friends}
            switchOnToggle={() => handleToggle('friends')}
          />
        </div>
      </div>
    </>
  );
}