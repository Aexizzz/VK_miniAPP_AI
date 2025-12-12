import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SyncUserDto } from './dto/sync-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sync')
  sync(@Body() dto: SyncUserDto) {
    return this.usersService.syncUser(dto);
  }

  @Get(':vkUserId')
  getUser(@Param('vkUserId', ParseIntPipe) vkUserId: number) {
    return this.usersService.getByVkUserId(vkUserId);
  }
}
