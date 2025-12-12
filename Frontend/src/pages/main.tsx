import { useEffect, useState } from 'react';
import { useVkUser } from '../hooks/vkUser';
import { getContentGrouped, getStatistics, GroupedContent } from '../utils/api';
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

type CardListItem = {
  id: number;
  title: string;
  subtitle: string;
  cover: string;
  avatar?: string;
  itemLink: string;
};

export default function MainPage() {
  const [visibleSections, setVisibleSections] = useState({
    music: true,
    video: true,
    podcast: true,
    community: true,
    games: true,
    friends: true,
  });
  const [content, setContent] = useState<Record<string, CardListItem[]>>({});
  const [statistics, setStatistics] = useState({
    views: 0,
    comments: 0,
    followers: 0,
    healthScore: 0,
  });
  const { userInfo } = useVkUser();
  const userFirstName = userInfo?.first_name || 'Гость';
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;

  const handleHideSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({ ...prev, [section]: false }));
  };

  useEffect(() => {
    if (!userInfo) return;

    let cancelled = false;
    getContentGrouped()
      .then((data: GroupedContent) => {
        if (cancelled) return;
        const toCardList = (items: any[]) =>
          (items || []).map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle ?? '',
            cover: item.coverUrl ?? '',
            avatar: item.avatarUrl ?? '',
            itemLink: item.itemLink ?? '#',
          }));

        setContent({
          music: toCardList(data.music || []),
          video: toCardList(data.video || []),
          podcast: toCardList(data.podcast || []),
          community: toCardList(data.community || []),
          games: toCardList(data.game || data.games || data.GAME || []),
          friends: toCardList(data.friend || data.friends || data.FRIEND || []),
        });
      })
      .catch((err) => {
        console.error('Failed to load content', err);
      });

    return () => {
      cancelled = true;
    };
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) return;
    let cancelled = false;
    getStatistics(userInfo.id)
      .then((stats) => {
        if (cancelled) return;
        setStatistics(stats);
      })
      .catch((err) => {
        console.error('Failed to load statistics', err);
      });

    return () => {
      cancelled = true;
    };
  }, [userInfo]);

  return (
    <>
      <div className="Main-Screen-Back"></div>
      <div className="Content-Title">
        <img className="Content-Title-Avatar" src={userPhotoUrl} alt="" />
        <h3 className="ttp-Title_2-emphaized Content-Title-Title">
          Привет, {userFirstName}
        </h3>
      </div>

      <div className="Cards-Group">
        <div className="Cards-Row">
          <Card
            type="Default"
            size="Small"
            title="Просмотры"
            subtitle={`${statistics.views} за период`}
            showIcon
            icon={<Icon24ViewOutline />}
            cardLink
            link="/settings/statistic"
          />

          <Card
            type="Default"
            size="Small"
            title="Комментарии"
            subtitle={`${statistics.comments} за период`}
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
            title="Подписчики"
            subtitle={`+${statistics.followers} за период`}
            showIcon
            icon={<Icon24UserAddOutline />}
            cardLink
            link="/settings/statistic"
          />

          <Card
            type="Default"
            size="Small"
            title="Здоровье"
            subtitle={`${statistics.healthScore} баллов`}
            showIcon
            icon={<Icon24HealthOutline />}
            cardLink
            link="/settings/statistic"
          />
        </div>
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
            items={content.music}
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
            items={content.video}
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
            items={content.podcast}
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
            items={content.community}
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
            items={content.games}
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
            items={content.friends}
          />
        )}
      </div>
    </>
  );
}
