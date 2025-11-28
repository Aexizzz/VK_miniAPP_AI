// Components
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RowHeader from '../../components/rows/RowHeader/RowHeader';
import StatisticCard from '../../components/StatisticCard/StatisticCard';
// Icons
import { Icon24StatisticsOutline } from '@vkontakte/icons';

export default function StatisticPage() {
  return (
    <>
        <NavigationBar title='Статистика'/>
        <RowHeader
          title='Статистика'
          subtitle='Следите за динамикой своего профиля'

          showIcon
          Icon=<Icon24StatisticsOutline/>
        />

        <div className="Cards-Group">
          <div className="Cards-Row">
            <StatisticCard
              title='Title'
              subtitle='Subtitle'
            />

            <StatisticCard
              title='Title'
              subtitle='Subtitle'
            />
          </div>

          <div className="Cards-Row">
            <StatisticCard
              title='Title'
              subtitle='Subtitle'
            />
            
            <StatisticCard
              title='Title'
              subtitle='Subtitle'
            />
          </div>
        </div>
    </>
  );
};