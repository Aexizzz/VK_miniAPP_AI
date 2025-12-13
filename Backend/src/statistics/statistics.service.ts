import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStatisticsDto } from './dto/update-statistics.dto';
import { Statistic, User } from '@prisma/client';
import { VkService } from '../vk/vk.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vkService: VkService,
  ) {}

  private async getUserWithStats(
    vkUserId: number,
  ): Promise<User & { statistics: Statistic | null }> {
    let user = await this.prisma.user.findUnique({
      where: { vkUserId },
      include: { statistics: true },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          vkUserId,
          firstName: 'User',
          lastName: `${vkUserId}`,
        },
        include: { statistics: true },
      });
    }

    if (!user.statistics) {
      await this.prisma.statistic.create({ data: { userId: user.id } });
      return this.getUserWithStats(vkUserId);
    }

    return user;
  }

  async getStatistics(vkUserId: number) {
    const user = await this.getUserWithStats(vkUserId);
    const vkUser = await this.vkService.fetchUser(vkUserId).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch VK user stats', err);
      return null;
    });

    if (vkUser) {
      const computedFollowers = vkUser.followers_count ?? user.statistics?.followers ?? 0;
      const computedViews =
        (vkUser.counters?.videos ?? 0) + (vkUser.counters?.photos ?? 0);
      const computedComments = vkUser.counters?.friends ?? 0;
      const computedHealth = computedFollowers + computedViews + computedComments;

      const updated = await this.prisma.statistic.update({
        where: { userId: user.id },
        data: {
          followers: computedFollowers,
          views: computedViews,
          comments: computedComments,
          healthScore: computedHealth,
        },
      });

      return updated;
    }

    return user.statistics;
  }

  async updateStatistics(vkUserId: number, dto: UpdateStatisticsDto) {
    const user = await this.getUserWithStats(vkUserId);

    return this.prisma.statistic.update({
      where: { userId: user.id },
      data: {
        views: dto.views ?? undefined,
        comments: dto.comments ?? undefined,
        followers: dto.followers ?? undefined,
        healthScore: dto.healthScore ?? undefined,
      },
    });
  }
}
