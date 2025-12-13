import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { VkModule } from '../vk/vk.module';

@Module({
  imports: [VkModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
