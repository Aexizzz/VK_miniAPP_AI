// Components
import RowHeader from '../../components/rows/RowHeader/RowHeader';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Row from '../../components/rows/Row/Row';
// Icons
import {
    Icon24StatisticsOutline,
    Icon24ViewOutline,
    Icon24CommentOutline,
    Icon24UserAddOutline,
    Icon24HealthOutline,
    Icon24StarsOutline,
    Icon24MusicOutline,
    Icon24VideoSquareOutline,
    Icon24PodcastOutline,
    Icon24Users3Outline,
    Icon24GameOutline,
    Icon24UsersOutline
 } from '@vkontakte/icons';

export default function NotificationsPage() {
  return (
    <>
        <NavigationBar title='Уведомления'/>

        <RowHeader title='Уведомления' subtitle='Выбирайте, о чём напоминать' showIcon Icon=<Icon24StatisticsOutline/> />

        <div className="Row-Groups">
            <div className="Row-Group">
                <Row
                    showIcon
                    icon=<Icon24StatisticsOutline/>
                                
                    type='Default'
                    title='Статистика'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />
                
                <Row
                    showIcon
                    icon=<Icon24ViewOutline/>
                                
                    type='Default'
                    title='Просмотры'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />

                <Row
                    showIcon
                    icon=<Icon24CommentOutline/>
                                
                    type='Default'
                    title='Комментарии'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />

                <Row
                    showIcon
                    icon=<Icon24UserAddOutline/>
                                
                    type='Default'
                    title='Заявки'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />

                <Row
                    showIcon
                    icon=<Icon24HealthOutline/>
                                
                    type='Default'
                    title='Шаги'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />
            </div>

            <div className="Row-Group">
                <Row
                    showIcon
                    icon=<Icon24StarsOutline/>
                                
                    type='Default'
                    title='Рекомендации'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />
                
                <Row
                    showIcon
                    icon=<Icon24MusicOutline/>
                                
                    type='Default'
                    title='Музыка'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />

                <Row
                    showIcon
                    icon=<Icon24VideoSquareOutline/>
                                
                    type='Default'
                    title='Видео'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />

                <Row
                    showIcon
                    icon=<Icon24PodcastOutline/>
                                
                    type='Default'
                    title='Подкасты'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />

                <Row
                    showIcon
                    icon=<Icon24Users3Outline/>
                                
                    type='Default'
                    title='Сообщества'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />
                
                <Row
                    showIcon
                    icon=<Icon24GameOutline/>
                                
                    type='Default'
                    title='Игры'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />

                <Row
                    showIcon
                    icon=<Icon24UsersOutline/>
                                
                    type='Default'
                    title='Друзья'
                    rowLink='/settings/notifications'
                
                    showTrailing
                    trailingType='Switch' />
            </div>
        </div>
    </>
  );
};