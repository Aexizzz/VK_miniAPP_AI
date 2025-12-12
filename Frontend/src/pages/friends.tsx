import { useVkUser } from '../hooks/vkUser'; 
// Components
import ListControl from '../components/List/ListControls/ListControls';
import ListItem from '../components/List/llistItem/ListItem';
import RowTitle from '../components/rows/RowTitle/RowTitle';
import Card from '../components/Card/Card';
// Assets
import defaultAvatarSvg from '../assets/default/avatar.svg'; 

export default function FriendsPage() {
  // Данные страницы ВК
  const { userInfo } = useVkUser();
  // Имя пользователя
  const userFirstName = userInfo?.first_name || 'Имя?';
  // Фотография профиля
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;
  return (
    <>
      <div className="Content-Title">
        <img className='Content-Title-Avatar' src={userPhotoUrl}  alt="" />
        <h3 className='ttp-Title_2-emphaized Content-Title-Title'>Друзья для вас, {userFirstName}</h3>
      </div>

      <div className="Cards-Group">
        <div className="Cards-Row">
          <Card
            type='ListItem'
            size='Small'
            title='Title'
            subtitle='Subtitle'
            cardListType='Circle'
            cover=''
          />

          <Card
            type='ListItem'
            size='Small'
            title='Title'
            subtitle='Subtitle'
            cardListType='Circle'
            cover=''
          />
        </div>

        <div className="Cards-Row">
          <Card
            type='ListItem'
            size='Small'
            title='Title'
            subtitle='Subtitle'
            cardListType='Circle'
            cover=''
          />

          <Card
            type='ListItem'
            size='Small'
            title='Title'
            subtitle='Subtitle'
            cardListType='Circle'
            cover=''
          />
        </div>
      </div>

      <div className="HorList">
        <ListControl/>
        <RowTitle
          type='Default'
          title='Может вы их знаете?'
        />
        <div className="HorList-Scroll">
          <div className="HorList-Items">
            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />

            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />

            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />

            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />

            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />
          </div>
        </div>
      </div>

      <div className="HorList">
        <ListControl/>
        <RowTitle
          type='Plus'
          title='Огурец Спит'
          subtitle='Может он вас познакомит?'
          cover=''
        />
        <div className="HorList-Scroll">
          <div className="HorList-Items">
            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />

            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />

            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />

            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />

            <ListItem
              type='Circle'
              size='Large'
              title='Title'
              subtitle='Subtitle'
              avatar=''
              cover=''
              coverLink=''
            />
          </div>
        </div>
      </div>
    </>
  );
};