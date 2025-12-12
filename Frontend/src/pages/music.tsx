import { useState } from 'react'; // <-- ОБЯЗАТЕЛЬНЫЙ ИМПОРТ
import { useVkUser } from '../hooks/vkUser'; 
// Components
import Card from '../components/Card/Card';
// Assets
import defaultAvatarSvg from '../assets/default/avatar.svg'; 
// Icons
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
  Icon24UsersOutline
} from '@vkontakte/icons';

export default function MainPage() {
  // Состояние для видимости секций (НОВОЕ)
  const [visibleSections, setVisibleSections] = useState({
    music: true,
    video: true,
    podcast: true,
    community: true,
    games: true,
    friends: true
  });

  // Обработчик скрытия (НОВОЕ)
  const handleHideSection = (section: keyof typeof visibleSections) => {
    setVisibleSections(prev => ({ ...prev, [section]: false }));
  };

  // Данные страницы ВК
  const { userInfo } = useVkUser();
  const userFirstName = userInfo?.first_name || 'Имя?';
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;

  // Мапы данных (остаются без изменений)
  const CardMusicItems = [ /* ... */ ];
  const CardVideoItems = [ /* ... */ ];
  const CardPodcastItems = [ /* ... */ ];
  const CardCommunityItems = [ /* ... */ ];
  const CardGamesItems = [ /* ... */ ];
  const CardFriendsItems = [ /* ... */ ];

  return (
    <>
      <div className="Main-Screen-Back"></div>
      <div className="Content-Title">
        <img className='Content-Title-Avatar' src={userPhotoUrl} alt="" />
        <h3 className='ttp-Title_2-emphaized Content-Title-Title'>Здравствуйте, {userFirstName}</h3>
      </div>

      <div className="Cards-Group">
        {/* ... мелкие карточки остаются без изменений */}
      </div>

      <div className="Group">
        {/* УСЛОВНЫЙ РЕНДЕРИНГ ДЛЯ КАЖДОЙ СЕКЦИИ */}
        
        {visibleSections.music && (
          <Card
            type='Default'
            size='Large'
            title='Музыка'
            subtitle='Подборка по вашему настроению'
            showIcon
            icon={<Icon24LogoVkMusicOutline/>}
            showButtons
            showSecondaryButton
            primaryButtonLabel='Слушать'
            primaryButtonLink='/music'
            secondaryButtonLabel='Не интересно'
            onSecondaryClick={() => handleHideSection('music')} // <-- ПОДКЛЮЧЕНИЕ
            showCardList
            cardListType='Rounded'
            items={CardMusicItems}
          />
        )}

        {visibleSections.video && (
          <Card
            type='Default'
            size='Large'
            title='Видео'
            subtitle='Думаю, вам это понравится'
            showIcon
            icon={<Icon24LogoVkVideoOutline/>}
            showButtons
            showSecondaryButton
            primaryButtonLabel='Смотреть'
            primaryButtonLink='/video'
            secondaryButtonLabel='Не интересно'
            onSecondaryClick={() => handleHideSection('video')}
            showCardList
            cardListType='Rounded'
            items={CardVideoItems}
          />
        )}

        {visibleSections.podcast && (
          <Card
            type='Default'
            size='Large'
            title='Подкасты'
            subtitle='Аудио-шоу по вашим темам'
            showIcon
            icon={<Icon24PodcastOutline/>}
            showButtons
            showSecondaryButton
            primaryButtonLabel='Слушать'
            primaryButtonLink='/podcast'
            secondaryButtonLabel='Не интересно'
            onSecondaryClick={() => handleHideSection('podcast')}
            showCardList
            cardListType='Rounded'
            items={CardPodcastItems}
          />
        )}

        {visibleSections.community && (
          <Card
            type='Default'
            size='Large'
            title='Сообщества'
            subtitle='Сообщества, которые вам могут понравиться'
            showIcon
            icon={<Icon24Users3Outline/>}
            showButtons
            showSecondaryButton
            primaryButtonLabel='Перейти'
            primaryButtonLink='/community'
            secondaryButtonLabel='Не интересно'
            onSecondaryClick={() => handleHideSection('community')}
            showCardList
            cardListType='Rounded'
            items={CardCommunityItems}
          />
        )}

        {visibleSections.games && (
          <Card
            type='Default'
            size='Large'
            title='Игры'
            subtitle='Попробуйте популярные мини-игры'
            showIcon
            icon={<Icon24GameOutline/>}
            showButtons
            showSecondaryButton
            primaryButtonLabel='Играть'
            primaryButtonLink='/games'
            secondaryButtonLabel='Не интересно'
            onSecondaryClick={() => handleHideSection('games')}
            showCardList
            cardListType='Rounded'
            items={CardGamesItems}
          />
        )}

        {visibleSections.friends && (
          <Card
            type='Default'
            size='Large'
            title='Друзья'
            subtitle='Совпадения по интересам'
            showIcon
            icon={<Icon24UsersOutline/>}
            showButtons
            showSecondaryButton
            primaryButtonLabel='Перейти'
            primaryButtonLink='/friends'
            secondaryButtonLabel='Не интересно'
            onSecondaryClick={() => handleHideSection('friends')}
            showCardList
            cardListType='Rounded'
            items={CardFriendsItems}
          />
        )}
      </div>
    </>
  );
}