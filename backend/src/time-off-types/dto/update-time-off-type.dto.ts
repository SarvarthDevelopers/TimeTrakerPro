// src/time-off-types/dto/update-time-off-type.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeOffTypeDto } from './create-time-off-type.dto';

export class UpdateTimeOffTypeDto extends PartialType(CreateTimeOffTypeDto) {}
