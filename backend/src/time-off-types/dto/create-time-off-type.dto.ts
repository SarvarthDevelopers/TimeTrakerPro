// src/time-off-types/dto/create-time-off-type.dto.ts
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTimeOffTypeDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
