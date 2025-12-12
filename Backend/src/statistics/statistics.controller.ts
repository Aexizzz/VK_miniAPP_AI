import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { UpdateStatisticsDto } from './dto/update-statistics.dto';

@Controller('users/:vkUserId/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics(@Param('vkUserId', ParseIntPipe) vkUserId: number) {
    return this.statisticsService.getStatistics(vkUserId);
  }

  @Patch()
  updateStatistics(
    @Param('vkUserId', ParseIntPipe) vkUserId: number,
    @Body() dto: UpdateStatisticsDto,
  ) {
    return this.statisticsService.updateStatistics(vkUserId, dto);
  }
}
