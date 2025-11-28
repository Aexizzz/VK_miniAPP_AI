import { useVkUser } from '../hooks/vkUser';
import { useSections } from '../hooks/useSections';
import ListControl from '../components/List/ListControls/ListControls';
import ListItem from '../components/List/llistItem/ListItem';
import RowTitle from '../components/rows/RowTitle/RowTitle';
import Card from '../components/Card/Card';
import defaultAvatarSvg from '../assets/default/avatar.svg';

export default function CommunityPage() {
  const { userInfo } = useVkUser();
  const userFirstName = userInfo?.first_name || 'Guest';
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;

  const { getSectionItems } = useSections();
  const communityItems = getSectionItems('community');

  const featured = communityItems.slice(0, 4);
  const more = communityItems.slice(4);

  return (
    <>
      <div className="Content-Title">
        <img className="Content-Title-Avatar" src={userPhotoUrl} alt="" />
        <h3 className="ttp-Title_2-emphaized Content-Title-Title">Communities for you, {userFirstName}</h3>
      </div>

      <div className="Cards-Group">
        <div className="Cards-Row">
          {featured.slice(0, 2).map((item) => (
            <Card
              key={item.id}
              type="ListItem"
              size="Small"
              title={item.title}
              subtitle={item.subtitle}
              cardListType="Rounded"
              cover={item.cover}
            />
          ))}
        </div>

        <div className="Cards-Row">
          {featured.slice(2, 4).map((item) => (
            <Card
              key={item.id}
              type="ListItem"
              size="Small"
              title={item.title}
              subtitle={item.subtitle}
              cardListType="Rounded"
              cover={item.cover}
            />
          ))}
        </div>
      </div>

      <div className="HorList">
        <ListControl />
        <RowTitle type="Default" title="Stay in touch" />
        <div className="HorList-Scroll">
          <div className="HorList-Items">
            {more.map((item) => (
              <ListItem
                key={item.id}
                type="Circle"
                size="Large"
                title={item.title}
                subtitle={item.subtitle}
                avatar={item.avatar}
                cover={item.cover}
                coverLink={item.itemLink}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
