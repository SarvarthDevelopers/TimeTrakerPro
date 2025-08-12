// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TimeOffTypesService {}

// src/time-off-types/time-off-types.service.ts
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeOffTypeDto } from './dto/create-time-off-type.dto';
import { UpdateTimeOffTypeDto } from './dto/update-time-off-type.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimeOffTypesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTimeOffTypeDto) {
    try {
      const created = await this.prisma.timeOffType.create({
        data: {
          name: dto.name,
          isPaid: dto.isPaid ?? true,
          description: dto.description ?? null,
        },
      });
      return created;
    } catch (err) {
      // Unique constraint (name) -> Prisma error code P2002
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new ConflictException('A time-off-type with this name already exists');
      }
      throw new InternalServerErrorException('Failed to create time off type');
    }
  }

  async findAll() {
    return this.prisma.timeOffType.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const item = await this.prisma.timeOffType.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`TimeOffType with id ${id} not found`);
    return item;
  }

  async update(id: string, dto: UpdateTimeOffTypeDto) {
    // ensure exists (throws 404 if not)
    await this.findOne(id);

    try {
      const updated = await this.prisma.timeOffType.update({
        where: { id },
        data: {
          name: dto.name,
          isPaid: dto.isPaid,
          description: dto.description,
          updatedAt: new Date(), // update timestamp on every update
        },
      });
      return updated;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new ConflictException('A time-off-type with this name already exists');
      }
      throw new InternalServerErrorException('Failed to update time off type');
    }
  }

  async remove(id: string) {
    // ensure exists
    await this.findOne(id);
    return this.prisma.timeOffType.delete({ where: { id } });
  }
}
