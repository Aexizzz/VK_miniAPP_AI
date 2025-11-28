import { useState, useEffect } from 'react';
// Components
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RowHeader from '../../components/rows/RowHeader/RowHeader';
import Row from '../../components/rows/Row/Row';
// Utils
import { dynamicTabs, toggleTab, loadTabsFromStorage } from "../../utils/tabBar";
// Icons
import {
  Icon24Square4Outline,
  Icon24MusicOutline,
  Icon24VideoSquareOutline,
  Icon24Podcast,
  Icon24Users3Outline,
  Icon24GameOutline,
  Icon24UsersOutline
} from '@vkontakte/icons';

type TabBarPageProps = {
  onTabbarUpdate: () => void;
};

// Загружаем состояние при импорте
loadTabsFromStorage();

export default function TabbarPage({ onTabbarUpdate }: TabBarPageProps) {
  const [_, forceUpdate] = useState(0);

  useEffect(() => {
    loadTabsFromStorage();
    forceUpdate(prev => prev + 1);
  }, []);

  const getEnabled = (name: string) => {
    const tab = dynamicTabs.find(t => t.name === name);
    return tab?.enabled ?? false;
  };

  const handleToggle = (name: string) => {
    toggleTab(name);
    onTabbarUpdate();
    forceUpdate(prev => prev + 1);
  };

  return (
    <>
      <NavigationBar title='Нижняя панель'/>

      <RowHeader
        title='Нижняя панель'
        subtitle='Выбирайте, что важнее именно для вас'
        showIcon
        Icon={<Icon24Square4Outline />}
      />
      
      <div className="Row-Gropus">
        <div className="Row-Group">
          <Row
            showIcon
            icon={<Icon24VideoSquareOutline />}
            type='Default'
            title='Видео'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={getEnabled("video")}
            switchOnToggle={() => handleToggle("video")}
          />

          <Row
            showIcon
            icon={<Icon24MusicOutline />}
            type='Default'
            title='Музыка'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={getEnabled("music")}
            switchOnToggle={() => handleToggle("music")}
          />

          <Row
            showIcon
            icon={<Icon24Podcast />}
            type='Default'
            title='Подкасты'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={getEnabled("podcast")}
            switchOnToggle={() => handleToggle("podcast")}
          />
                  
          <Row
            showIcon
            icon={<Icon24Users3Outline />}
            type='Default'
            title='Сообщества'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={getEnabled("community")}
            switchOnToggle={() => handleToggle("community")}
          />
                  
          <Row
            showIcon
            icon={<Icon24GameOutline />}
            type='Default'
            title='Игры'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={getEnabled("games")}
            switchOnToggle={() => handleToggle("games")}
          />
                  
          <Row
            showIcon
            icon={<Icon24UsersOutline />}
            type='Default'
            title='Друзья'
            showTrailing
            trailingType='Switch'
            switchDefaultChecked={getEnabled("friends")}
            switchOnToggle={() => handleToggle("friends")}
          />
        </div>
      </div>
    </>
  );
}