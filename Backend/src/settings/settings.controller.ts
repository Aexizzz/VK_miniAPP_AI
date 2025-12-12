import { Body, Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Controller('users/:vkUserId/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getSettings(@Param('vkUserId', ParseIntPipe) vkUserId: number) {
    return this.settingsService.getSettings(vkUserId);
  }

  @Patch()
  updateSettings(
    @Param('vkUserId', ParseIntPipe) vkUserId: number,
    @Body() dto: UpdateSettingsDto,
  ) {
    return this.settingsService.updateSettings(vkUserId, dto);
  }
}
