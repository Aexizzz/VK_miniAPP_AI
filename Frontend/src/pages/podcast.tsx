import { useVkUser } from '../hooks/vkUser';
import { useSections } from '../hooks/useSections';
import ListControl from '../components/List/ListControls/ListControls';
import ListItem from '../components/List/llistItem/ListItem';
import RowTitle from '../components/rows/RowTitle/RowTitle';
import defaultAvatarSvg from '../assets/default/avatar.svg';

export default function PodcastPage() {
  const { userInfo } = useVkUser();
  const userFirstName = userInfo?.first_name || 'Guest';
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;

  const { getSectionItems } = useSections();
  const podcastItems = getSectionItems('podcast');

  return (
    <>
      <div className="Content-Title">
        <img className="Content-Title-Avatar" src={userPhotoUrl} alt="" />
        <h3 className="ttp-Title_2-emphaized Content-Title-Title">Podcasts for you, {userFirstName}</h3>
      </div>

      <div className="HorList">
        <ListControl />
        <RowTitle type="Default" title="New episodes" />
        <div className="HorList-Scroll">
          <div className="HorList-Items">
            {podcastItems.map((item) => (
              <ListItem
                key={item.id}
                type="Rounded"
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
