import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { CONTENT_TYPES, CreateContentDto } from './dto/create-content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  list(@Query('type') type?: string, @Query('vkUserId') vkUserId?: string) {
    if (type) {
      const contentType = this.contentService.ensureValidType(type);
      return this.contentService.listByType(contentType);
    }
    if (vkUserId) {
      return this.contentService.listPersonalized(Number(vkUserId));
    }
    return this.contentService.listGrouped();
  }

  @Get('types')
  getTypes() {
    return CONTENT_TYPES;
  }

  @Post()
  create(@Body() dto: CreateContentDto) {
    return this.contentService.create(dto);
  }
}
