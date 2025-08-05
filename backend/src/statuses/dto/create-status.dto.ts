import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  context: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsBoolean()
  isFinal?: boolean;
}
