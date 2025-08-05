/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Statuses } from '@prisma/client';

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStatusDto): Promise<Statuses> {
    return this.prisma.statuses.create({ data });
  }

  async findAll(): Promise<Statuses[]> {
    return this.prisma.statuses.findMany();
  }

  async findOne(id: string): Promise<Statuses> {
    const status = await this.prisma.statuses.findUnique({ where: { id } });
    if (!status) throw new NotFoundException('Status not found');
    return status;
  }

  async update(id: string, data: UpdateStatusDto): Promise<Statuses> {
    await this.findOne(id); // ensure exists
    return this.prisma.statuses.update({ where: { id }, data });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.statuses.delete({ where: { id } });
    return { message: 'Status deleted successfully' };
  }
}
