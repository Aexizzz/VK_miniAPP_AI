import {
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export const THEMES = ['LIGHT', 'DARK'] as const;

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  @IsIn(THEMES)
  theme?: string;

  @IsOptional()
  @IsBoolean()
  notificationsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  recommendationsEnabled?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(50, { each: true })
  tabOrder?: string[];
}
