import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings(vkUserId: number) {
    const user = await this.prisma.user.findUnique({
      where: { vkUserId },
      select: {
        vkUserId: true,
        theme: true,
        tabOrder: true,
        notificationsEnabled: true,
        recommendationsEnabled: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with vkUserId ${vkUserId} not found`);
    }

    return {
      ...user,
      tabOrder: user.tabOrder ? JSON.parse(user.tabOrder as unknown as string) : null,
    };
  }

  async updateSettings(vkUserId: number, dto: UpdateSettingsDto) {
    const existing = await this.prisma.user.findUnique({ where: { vkUserId } });
    if (!existing) {
      throw new NotFoundException(`User with vkUserId ${vkUserId} not found`);
    }

    return this.prisma.user.update({
      where: { vkUserId },
      data: {
        theme: dto.theme ?? undefined,
        tabOrder: dto.tabOrder ? JSON.stringify(dto.tabOrder) : undefined,
        notificationsEnabled: dto.notificationsEnabled ?? undefined,
        recommendationsEnabled: dto.recommendationsEnabled ?? undefined,
      },
      select: {
        vkUserId: true,
        theme: true,
        tabOrder: true,
        notificationsEnabled: true,
        recommendationsEnabled: true,
      },
    }).then((user) => ({
      ...user,
      tabOrder: user.tabOrder ? JSON.parse(user.tabOrder as unknown as string) : null,
    }));
  }
}
