import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { VkModule } from '../vk/vk.module';

@Module({
  imports: [VkModule],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
