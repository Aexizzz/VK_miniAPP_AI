import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SyncUserDto } from './dto/sync-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async syncUser(dto: SyncUserDto) {
    const user = await this.prisma.user.upsert({
      where: { vkUserId: dto.vkUserId },
      update: {
        firstName: dto.firstName ?? 'User',
        lastName: dto.lastName ?? `${dto.vkUserId}`,
        avatarUrl: dto.avatarUrl,
        theme: undefined,
      },
      create: {
        vkUserId: dto.vkUserId,
        firstName: dto.firstName ?? 'User',
        lastName: dto.lastName ?? `${dto.vkUserId}`,
        avatarUrl: dto.avatarUrl,
      },
    });

    await this.prisma.statistic.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });

    return user;
  }

  async getByVkUserId(vkUserId: number) {
    const user = await this.prisma.user.findUnique({
      where: { vkUserId },
      include: { statistics: true },
    });

    if (!user) {
      throw new NotFoundException(`User with vkUserId ${vkUserId} not found`);
    }

    return user;
  }
}
