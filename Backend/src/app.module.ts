import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ContentModule } from './content/content.module';
import { SettingsModule } from './settings/settings.module';
import { StatisticsModule } from './statistics/statistics.module';
import { VkModule } from './vk/vk.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    ContentModule,
    SettingsModule,
    StatisticsModule,
    VkModule,
  ],
})
export class AppModule {}
