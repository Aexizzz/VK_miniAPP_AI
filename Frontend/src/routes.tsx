import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";
// Импорт страниц
import MainPage from "./pages/main";
import MusicPage from "./pages/music";
import VideoPage from "./pages/video";
import PodcastPage from "./pages/podcast";
import CommunityPage from "./pages/community";
import GamesPage from "./pages/games";
import FriendsPage from "./pages/friends";
import SettingsPage from "./pages/settings/settings";
import NotificationsPage from "./pages/settings/notifications";
import RecomendationsPage from "./pages/settings/recomendations";
import StatisticPage from "./pages/settings/statistic";
import TabbarPage from "./pages/settings/tabbar";
import InfoPage from "./pages/settings/info";

type AnimatedRoutesProps = {
  onTabbarUpdate: () => void;
};

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({ onTabbarUpdate }) => {
  const location = useLocation();


  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.key}
        timeout={120}
        classNames="fade"
        unmountOnExit
      >
        <TransitionGroup>
          <div className="Content">
            <Routes location={location}>
              <Route path="/" element={<MainPage />} />
              <Route path="/music" element={<MusicPage />} />
              <Route path="/video" element={<VideoPage />} />
              <Route path="/podcast" element={<PodcastPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              
              <Route path="/settings/notifications" element={<NotificationsPage />} />
              <Route path="/settings/recomendations" element={<RecomendationsPage />} />
              <Route path="/settings/statistic" element={<StatisticPage />} />
              <Route path="/settings/tab_bar" element={<TabbarPage onTabbarUpdate={onTabbarUpdate} />} />
              <Route path="/settings/info" element={<InfoPage />} />
            </Routes>
          </div>
        </TransitionGroup>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AnimatedRoutes;