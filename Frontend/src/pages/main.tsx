import { useEffect, useState } from 'react';
import connect from '@vkontakte/vk-bridge';
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
  const [vkAccessToken, setVkAccessToken] = useState<string | undefined>();
  const { userInfo } = useVkUser();
  const userFirstName = userInfo?.first_name || 'Гость';
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;

  const handleHideSection = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({ ...prev, [section]: false }));
  };

  useEffect(() => {
    const appId =
      (import.meta.env.VITE_VK_APP_ID as string | undefined) ||
      (import.meta.env.VITE_VK_CLIENT_ID as string | undefined);

    // 0) читаем web_token из localStorage (VK Mini Apps)
    const possibleKeys = new Set<string>();
    if (appId) possibleKeys.add(`${appId}:web_token:login:auth`);
    const envClientId = import.meta.env.VITE_VK_CLIENT_ID as string | undefined;
    if (envClientId) possibleKeys.add(`${envClientId}:web_token:login:auth`);
    Object.keys(localStorage).forEach((k) => {
      if (k.endsWith(':web_token:login:auth')) possibleKeys.add(k);
    });
    for (const key of possibleKeys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        const tokenCandidate = parsed?.access_token || parsed?.data?.access_token;
        if (tokenCandidate) {
          setVkAccessToken(tokenCandidate);
          localStorage.setItem('vk_access_token', tokenCandidate);
          return;
        }
      } catch {
        const tokenCandidate = raw;
        if (tokenCandidate) {
          setVkAccessToken(tokenCandidate);
          localStorage.setItem('vk_access_token', tokenCandidate);
          return;
        }
      }
    }

    // 1) токен в URL (hash/query)
    const urlToken =
      new URLSearchParams(window.location.hash.replace('#', '')).get('access_token') ||
      new URLSearchParams(window.location.search).get('access_token');
    if (urlToken) {
      setVkAccessToken(urlToken);
      localStorage.setItem('vk_access_token', urlToken);
      return;
    }

    // 2) токен из env (dev)
    const envToken = import.meta.env.VITE_VK_ACCESS_TOKEN as string | undefined;
    if (envToken) {
      setVkAccessToken(envToken);
      localStorage.setItem('vk_access_token', envToken);
      return;
    }

    // 3) запросить через Bridge
    if (!appId) return;
    connect
      .send('VKWebAppGetAuthToken', {
        app_id: Number(appId),
        scope: 'friends,groups,video,audio',
      })
      .then((res: { access_token?: string }) => {
        if (res?.access_token) {
          setVkAccessToken(res.access_token);
          localStorage.setItem('vk_access_token', res.access_token);
        }
      })
      .catch((err) => {
        console.warn('VKWebAppGetAuthToken failed', err);
      });

    // 4) слушаем событие токена
    const unsub = connect.subscribe((event) => {
      if (event.detail?.type === 'VKWebAppAccessTokenReceived') {
        const token = (event.detail.data as { access_token?: string })?.access_token;
        if (token) {
          setVkAccessToken(token);
          localStorage.setItem('vk_access_token', token);
        }
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!userInfo) return;

    let cancelled = false;
    getContentGrouped(userInfo.id, vkAccessToken)
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
  }, [userInfo, vkAccessToken]);

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
