import './index.css';
import AnimatedRoutes from "./routes.tsx";
import { loadTheme } from "./utils/theme";
import { useEffect, useState } from "react";
import { 
  getTabBarTabs, 
  loadTabsFromStorage,
  TabItem 
} from "./utils/tabBar"; // <-- ИСПРАВЛЕНО: один правильный импорт
// Components
import TabBar from "./components/tabBar/TabBar.tsx";

export const App = () => {
  const [tabs, setTabs] = useState<TabItem[]>([]);

  // Инициализация при загрузке приложения
  useEffect(() => {
    // Загружаем состояние из localStorage
    loadTabsFromStorage();
    // Получаем обновленные вкладки
    const initialTabs = getTabBarTabs();
    setTabs(initialTabs);
    
    // Синхронизация между вкладками
    const handleStorageChange = () => {
      loadTabsFromStorage();
      setTabs(getTabBarTabs());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Загрузка темы
  useEffect(() => {
    loadTheme();
  }, []);

  const refreshTabs = () => {
    loadTabsFromStorage();
    setTabs(getTabBarTabs());
  };

  return (
    <div className='Screen'>
      <TabBar tabs={tabs} />
      <AnimatedRoutes onTabbarUpdate={refreshTabs} />
    </div>
  );
};