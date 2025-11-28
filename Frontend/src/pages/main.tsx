import { useState } from 'react';
import { useVkUser } from '../hooks/vkUser';
import { useSections } from '../hooks/useSections';
import Card from '../components/Card/Card';
import defaultAvatarSvg from '../assets/default/avatar.svg';
import {
  Icon24ViewOutline,
  Icon24CommentOutline,
  Icon24UserAddOutline,
  Icon24HealthOutline,
  Icon24LogoVkMusicOutline,
  Icon24LogoVkVideoOutline,
  Icon24PodcastOutline,
  Icon24Users3Outline,
  Icon24GameOutline,
  Icon24UsersOutline,
} from '@vkontakte/icons';

export default function MainPage() {
  const [visibleSections, setVisibleSections] = useState({
    music: true,
    video: true,
    podcast: true,
    community: true,
    games: true,
    friends: true,
  });

  const handleHideSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({ ...prev, [section]: false }));
  };

  const { userInfo } = useVkUser();
  const userFirstName = userInfo?.first_name || 'Guest';
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;

  const { getSectionItems } = useSections();
  const CardMusicItems = getSectionItems('music');
  const CardVideoItems = getSectionItems('video');
  const CardPodcastItems = getSectionItems('podcast');
  const CardCommunityItems = getSectionItems('community');
  const CardGamesItems = getSectionItems('games');
  const CardFriendsItems = getSectionItems('friends');

  return (
    <>
      <div className="Main-Screen-Back"></div>
      <div className="Content-Title">
        <img className="Content-Title-Avatar" src={userPhotoUrl} alt="" />
        <h3 className="ttp-Title_2-emphaized Content-Title-Title">Welcome, {userFirstName}</h3>
      </div>

      <div className="Cards-Group">
        <div className="Cards-Row">
          <Card
            type="Default"
            size="Small"
            title="Views"
            subtitle="+321 new this week"
            showIcon
            icon={<Icon24ViewOutline />}
            cardLink
            link="/settings/statistic"
          />

          <Card
            type="Default"
            size="Small"
            title="Comments"
            subtitle="+18 new this week"
            showIcon
            icon={<Icon24CommentOutline />}
            cardLink
            link="/settings/statistic"
          />
        </div>

        <div className="Cards-Row">
          <Card
            type="Default"
            size="Small"
            title="New friends"
            subtitle="+89 this month"
            showIcon
            icon={<Icon24UserAddOutline />}
            cardLink
            link="/friends"
          />

          <Card
            type="Default"
            size="Small"
            title="Health"
            subtitle="Keep your streak"
            showIcon
            icon={<Icon24HealthOutline />}
            cardLink
            link="/settings"
          />
        </div>
      </div>

      <div className="Group">
        {visibleSections.music && (
          <Card
            type="Default"
            size="Large"
            title="Music"
            subtitle="Fresh tracks for you"
            showIcon
            icon={<Icon24LogoVkMusicOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Open music"
            primaryButtonLink="/music"
            secondaryButtonLabel="Hide"
            onSecondaryClick={() => handleHideSection('music')}
            showCardList
            cardListType="Rounded"
            items={CardMusicItems}
          />
        )}

        {visibleSections.video && (
          <Card
            type="Default"
            size="Large"
            title="Video"
            subtitle="Popular picks"
            showIcon
            icon={<Icon24LogoVkVideoOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Open video"
            primaryButtonLink="/video"
            secondaryButtonLabel="Hide"
            onSecondaryClick={() => handleHideSection('video')}
            showCardList
            cardListType="Rounded"
            items={CardVideoItems}
          />
        )}

        {visibleSections.podcast && (
          <Card
            type="Default"
            size="Large"
            title="Podcasts"
            subtitle="Latest episodes"
            showIcon
            icon={<Icon24PodcastOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Open podcasts"
            primaryButtonLink="/podcast"
            secondaryButtonLabel="Hide"
            onSecondaryClick={() => handleHideSection('podcast')}
            showCardList
            cardListType="Rounded"
            items={CardPodcastItems}
          />
        )}

        {visibleSections.community && (
          <Card
            type="Default"
            size="Large"
            title="Communities"
            subtitle="Stay in touch"
            showIcon
            icon={<Icon24Users3Outline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Open communities"
            primaryButtonLink="/community"
            secondaryButtonLabel="Hide"
            onSecondaryClick={() => handleHideSection('community')}
            showCardList
            cardListType="Rounded"
            items={CardCommunityItems}
          />
        )}

        {visibleSections.games && (
          <Card
            type="Default"
            size="Large"
            title="Games"
            subtitle="Play something new"
            showIcon
            icon={<Icon24GameOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Open games"
            primaryButtonLink="/games"
            secondaryButtonLabel="Hide"
            onSecondaryClick={() => handleHideSection('games')}
            showCardList
            cardListType="Rounded"
            items={CardGamesItems}
          />
        )}

        {visibleSections.friends && (
          <Card
            type="Default"
            size="Large"
            title="Friends"
            subtitle="Suggestions for you"
            showIcon
            icon={<Icon24UsersOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Open friends"
            primaryButtonLink="/friends"
            secondaryButtonLabel="Hide"
            onSecondaryClick={() => handleHideSection('friends')}
            showCardList
            cardListType="Rounded"
            items={CardFriendsItems}
          />
        )}
      </div>
    </>
  );
}
