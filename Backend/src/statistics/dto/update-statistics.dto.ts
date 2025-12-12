import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateStatisticsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  views?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  comments?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  followers?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  healthScore?: number;
}
