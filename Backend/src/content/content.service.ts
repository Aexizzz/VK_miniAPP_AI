import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CONTENT_TYPES, ContentType, CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContentDto) {
    return this.prisma.contentItem.create({ data: dto });
  }

  async listByType(type: ContentType) {
    return this.prisma.contentItem.findMany({
      where: { type },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async listGrouped() {
    const items = await this.prisma.contentItem.findMany({
      orderBy: [{ type: 'asc' }, { order: 'asc' }],
    });

    return CONTENT_TYPES.reduce<Record<string, typeof items>>((acc, type) => {
      acc[type.toLowerCase()] = items.filter((item) => item.type === type);
      return acc;
    }, {});
  }

  ensureValidType(type: string): ContentType {
    const normalized = type.toUpperCase();
    const match = CONTENT_TYPES.find((candidate) => candidate === normalized);
    if (!match) {
      throw new BadRequestException(`Unknown content type "${type}"`);
    }
    return match;
  }
}
