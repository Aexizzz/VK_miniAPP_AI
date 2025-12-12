import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export const CONTENT_TYPES = ['MUSIC', 'VIDEO', 'PODCAST', 'COMMUNITY', 'GAME', 'FRIEND'] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export class CreateContentDto {
  @IsString()
  @IsIn(CONTENT_TYPES)
  type!: ContentType;

  @IsString()
  @MaxLength(150)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  subtitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  coverUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  itemLink?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  order?: number;
}
