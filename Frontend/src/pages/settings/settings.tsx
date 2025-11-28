import { useVkUser } from '../../hooks/vkUser'
import { toggleTheme } from '../../utils/theme'// Components
import Row from '../../components/rows/Row/Row'
// Assets
import defaultAvatarSvg from '../../assets/default/avatar.svg'
// Icons
import {
  Icon24NotificationOutline,
  Icon24StarsOutline,
  Icon24StatisticsOutline,
  Icon24Moon,
  Icon24Square4Outline,
  Icon24LikeOutline,
  Icon24HelpOutline,
  Icon24InfoCircleOutline
} from '@vkontakte/icons';

export default function SettingsPage() {
  // Данные страницы ВК
  const { userInfo } = useVkUser()
  // Имя пользователя
  const userFirstName = userInfo?.first_name || 'Имя?'
  // Фамилия пользователя
  const userLastName = userInfo?.last_name || 'Фамилия?'
  // Фотография профиля
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg

  return (
    <>
      <div className="Settings-Header">
        <img className='Settings-Header-Profile_Photo' src={userPhotoUrl} alt="" />
        <div className="Settings-Header-Info">
          <h3 className='ttp-Title_2-emphaized Settings-Header-Info-Profile_Name'>{userFirstName} {userLastName}</h3>
        </div>
      </div>

      <div className="Row-Groups">
        <div className="Row-Group">
            <Row
              showIcon
              icon=<Icon24NotificationOutline/>
              
              type='Default'
              title='Уведомления'
              rowLink='/settings/notifications'

              showTrailing
              trailingType='Disclosure'
            />

            <Row
              showIcon
              icon=<Icon24StarsOutline/>
              
              type='Default'
              title='Рекомендации'
              rowLink='/settings/recomendations'

              showTrailing
              trailingType='Disclosure'
            />

            <Row
              showIcon
              icon=<Icon24StatisticsOutline/>
              
              type='Default'
              title='Статистика'
              rowLink='/settings/statistic'

              showTrailing
              trailingType='Disclosure'
            />
        </div>

        <div className="Row-Group">
          <Row
              showIcon
              icon=<Icon24Moon/>
              
              type='Default'
              title='Темная тема'
              rowLink='/settings'

              showTrailing
              trailingType="Switch"
              switchDefaultChecked={localStorage.getItem("theme") === "dark"}
              switchOnToggle={toggleTheme}
            />

            <Row
              showIcon
              icon=<Icon24Square4Outline/>
              
              type='Default'
              title='Нижняя панель'
              rowLink='/settings/tab_bar'

              showTrailing
              trailingType='Detail'
              detailInfo='Видео, Музыка'
            />
        </div>

        <div className="Row-Group">
          <Row
              showIcon
              icon=<Icon24LikeOutline/>
              
              type='Default'
              title='Поддержать'
              rowLink='https://www.tinkoff.ru/rm/r_lnxDVsvUUS.goRcZlbHdi/rLQKy54775'

              showTrailing
              trailingType='Disclosure'
            />

            <Row
              showIcon
              icon=<Icon24HelpOutline/>
              
              type='Default'
              title='Помощь'
              rowLink='https://t.me/miksMIDIS'

              showTrailing
              trailingType='Disclosure'
            />

            <Row
              showIcon
              icon=<Icon24InfoCircleOutline/>
              
              type='Default'
              title='Информация'
              rowLink='/settings/info'

              showTrailing
              trailingType='Disclosure'
            />
        </div>
      </div>
    </>
  );
};