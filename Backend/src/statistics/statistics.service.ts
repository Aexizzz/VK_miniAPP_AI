import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateStatisticsDto } from './dto/update-statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  private async getUserWithStats(vkUserId: number) {
    const user = await this.prisma.user.findUnique({
      where: { vkUserId },
      include: { statistics: true },
    });

    if (!user) {
      throw new NotFoundException(`User with vkUserId ${vkUserId} not found`);
    }

    if (!user.statistics) {
      await this.prisma.statistic.create({ data: { userId: user.id } });
      return this.getUserWithStats(vkUserId);
    }

    return user;
  }

  async getStatistics(vkUserId: number) {
    const user = await this.getUserWithStats(vkUserId);
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
