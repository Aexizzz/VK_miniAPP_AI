import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CONTENT_TYPES, ContentType, CreateContentDto } from './dto/create-content.dto';
import { VkService } from '../vk/vk.service';

@Injectable()
export class ContentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vkService: VkService,
  ) {}

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

  async listFromVk(vkUserId: number, vkAccessToken: string) {
    const [audio, video, friends] = await Promise.all([
      this.vkService.fetchAudioRecommendations(vkAccessToken),
      this.vkService.fetchVideoRecommendations(vkAccessToken),
      this.vkService.fetchFriends(vkAccessToken),
    ]);

    const toCardList = (items: any[], type: string) =>
      (items || []).map((item, idx) => ({
        id: item.id || idx,
        type,
        title: item.title || item.artist || `${type} ${idx}`,
        subtitle: item.artist || item.description || '',
        coverUrl: item.photo_200 || '',
        avatarUrl: item.photo_200 || '',
        itemLink:
          type === 'MUSIC'
            ? `https://vk.com/audio${item.owner_id}_${item.id}`
            : type === 'VIDEO'
              ? `https://vk.com/video${item.owner_id}_${item.id}`
              : item.domain
                ? `https://vk.com/${item.domain}`
                : `https://vk.com/id${item.id}`,
        order: idx,
      }));

    return {
      music: toCardList(audio, 'MUSIC'),
      video: toCardList(video, 'VIDEO'),
      podcast: [],
      community: [],
      games: [],
      friends: toCardList(friends, 'FRIEND'),
    };
  }

  private seededShuffle<T>(array: T[], seed: number): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i -= 1) {
      // simple deterministic pseudo-random based on seed
      seed = Math.sin(seed + i) * 10000;
      const j = Math.floor((seed - Math.floor(seed)) * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  async listPersonalized(vkUserId: number) {
    const user = await this.prisma.user.findUnique({
      where: { vkUserId },
      select: { tabOrder: true, recommendationsEnabled: true },
    });

    const base = await this.listGrouped();
    const order =
      user?.tabOrder && Array.isArray(user.tabOrder)
        ? (user.tabOrder as string[])
        : CONTENT_TYPES.map((t) => t.toLowerCase());

    const seed = vkUserId || Date.now();
    const personalized = Object.entries(base).reduce<Record<string, any[]>>(
      (acc, [type, items]) => {
        acc[type] =
          user?.recommendationsEnabled === false
            ? items
            : this.seededShuffle(items, seed).slice(0, 10);
        return acc;
      },
      {},
    );

    // reorder keys according to user tab order
    const sorted: Record<string, any[]> = {};
    order.forEach((key) => {
      if (personalized[key]) {
        sorted[key] = personalized[key];
      }
    });
    // append missing types
    Object.entries(personalized).forEach(([key, value]) => {
      if (!sorted[key]) {
        sorted[key] = value;
      }
    });

    return sorted;
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
