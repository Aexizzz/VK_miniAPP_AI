import { useVkUser } from '../hooks/vkUser';
import { useSections } from '../hooks/useSections';
import Card from '../components/Card/Card';
import defaultAvatarSvg from '../assets/default/avatar.svg';
import { Icon24LogoVkMusicOutline, Icon24LogoVkVideoOutline, Icon24PodcastOutline } from '@vkontakte/icons';

export default function MusicPage() {
  const { userInfo } = useVkUser();
  const userFirstName = userInfo?.first_name || 'Guest';
  const userPhotoUrl = userInfo?.photo_200 || defaultAvatarSvg;

  const { getSectionItems } = useSections();
  const musicItems = getSectionItems('music');
  const videoItems = getSectionItems('video');
  const podcastItems = getSectionItems('podcast');

  return (
    <>
      <div className="Main-Screen-Back"></div>
      <div className="Content-Title">
        <img className="Content-Title-Avatar" src={userPhotoUrl} alt="" />
        <h3 className="ttp-Title_2-emphaized Content-Title-Title">Music hub, {userFirstName}</h3>
      </div>

      <div className="Group">
        <Card
          type="Default"
          size="Large"
          title="Music"
          subtitle="Recommendations"
          showIcon
          icon={<Icon24LogoVkMusicOutline />}
          showButtons
          primaryButtonLabel="Open music"
          primaryButtonLink="/music"
          showCardList
          cardListType="Rounded"
          items={musicItems}
        />

        <Card
          type="Default"
          size="Large"
          title="Video clips"
          subtitle="Related videos"
          showIcon
          icon={<Icon24LogoVkVideoOutline />}
          showButtons
          primaryButtonLabel="Open video"
          primaryButtonLink="/video"
          showCardList
          cardListType="Video"
          items={videoItems}
        />

        <Card
          type="Default"
          size="Large"
          title="Podcasts"
          subtitle="Talks for you"
          showIcon
          icon={<Icon24PodcastOutline />}
          showButtons
          primaryButtonLabel="Open podcasts"
          primaryButtonLink="/podcast"
          showCardList
          cardListType="Rounded"
          items={podcastItems}
        />
      </div>
    </>
  );
}
