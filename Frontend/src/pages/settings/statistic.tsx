import { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RowHeader from '../../components/rows/RowHeader/RowHeader';
import StatisticCard from '../../components/StatisticCard/StatisticCard';
import { Icon24StatisticsOutline } from '@vkontakte/icons';
import { getStatistics, ApiStatistics } from '../../utils/api';
import { useVkUser } from '../../hooks/vkUser';

export default function StatisticPage() {
  const { userInfo } = useVkUser();
  const [stats, setStats] = useState<ApiStatistics>({
    views: 0,
    comments: 0,
    followers: 0,
    healthScore: 0,
  });

  useEffect(() => {
    if (!userInfo) return;
    let cancelled = false;

    getStatistics(userInfo.id)
      .then((data) => {
        if (cancelled) return;
        setStats(data);
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
      <NavigationBar title="Статистика" />
      <RowHeader
        title="Статистика"
        subtitle="Цифры подтягиваются с бэкенда (NestJS/Prisma)"
        showIcon
        Icon={<Icon24StatisticsOutline />}
      />

      <div className="Cards-Group">
        <div className="Cards-Row">
          <StatisticCard title="Просмотры" subtitle={`${stats.views}`} />
          <StatisticCard title="Комментарии" subtitle={`${stats.comments}`} />
        </div>

        <div className="Cards-Row">
          <StatisticCard title="Подписчики" subtitle={`${stats.followers}`} />
          <StatisticCard title="Здоровье" subtitle={`${stats.healthScore}`} />
        </div>
      </div>
    </>
  );
}
