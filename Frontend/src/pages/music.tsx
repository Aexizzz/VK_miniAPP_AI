import { useState } from 'react';
import { useVkUser } from '../hooks/vkUser';
import Card from '../components/Card/Card';
import defaultAvatarSvg from '../assets/default/avatar.svg';
import {
  Icon24LogoVkMusicOutline,
  Icon24LogoVkVideoOutline,
  Icon24PodcastOutline,
  Icon24Users3Outline,
  Icon24GameOutline,
  Icon24UsersOutline,
} from '@vkontakte/icons';

type CardListItem = {
  id: number;
  title: string;
  subtitle: string;
  cover: string;
  avatar?: string;
  itemLink: string;
};

export default function MusicPage() {
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
  const userFirstName = userInfo?.first_name || 'Гость';
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;

  const placeholderItems = (prefix: string): CardListItem[] =>
    Array.from({ length: 5 }).map((_, idx) => ({
      id: idx,
      title: `${prefix} ${idx}`,
      subtitle: 'subtitle',
      cover: '',
      avatar: '',
      itemLink: '#',
    }));

  const CardMusicItems = placeholderItems('Track');
  const CardVideoItems = placeholderItems('Video');
  const CardPodcastItems = placeholderItems('Podcast');
  const CardCommunityItems = placeholderItems('Community');
  const CardGamesItems = placeholderItems('Game');
  const CardFriendsItems = placeholderItems('Friend');

  return (
    <>
      <div className="Main-Screen-Back"></div>
      <div className="Content-Title">
        <img className="Content-Title-Avatar" src={userPhotoUrl} alt="" />
        <h3 className="ttp-Title_2-emphaized Content-Title-Title">
          Привет, {userFirstName}
        </h3>
      </div>

      <div className="Group">
        {visibleSections.music && (
          <Card
            type="Default"
            size="Large"
            title="Музыка"
            subtitle="Подборка треков"
            showIcon
            icon={<Icon24LogoVkMusicOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Открыть"
            primaryButtonLink="/music"
            secondaryButtonLabel="Скрыть"
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
            title="Видео"
            subtitle="Свежие ролики"
            showIcon
            icon={<Icon24LogoVkVideoOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Открыть"
            primaryButtonLink="/video"
            secondaryButtonLabel="Скрыть"
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
            title="Подкасты"
            subtitle="Лучшие эпизоды"
            showIcon
            icon={<Icon24PodcastOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Открыть"
            primaryButtonLink="/podcast"
            secondaryButtonLabel="Скрыть"
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
            title="Сообщества"
            subtitle="Что сейчас обсуждают"
            showIcon
            icon={<Icon24Users3Outline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Открыть"
            primaryButtonLink="/community"
            secondaryButtonLabel="Скрыть"
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
            title="Игры"
            subtitle="Для перерыва"
            showIcon
            icon={<Icon24GameOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Открыть"
            primaryButtonLink="/games"
            secondaryButtonLabel="Скрыть"
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
            title="Друзья"
            subtitle="Кого добавить в ленту"
            showIcon
            icon={<Icon24UsersOutline />}
            showButtons
            showSecondaryButton
            primaryButtonLabel="Открыть"
            primaryButtonLink="/friends"
            secondaryButtonLabel="Скрыть"
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
