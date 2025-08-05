/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class TeamsService {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateTeamDto, UpdateTeamDto } from './dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';


@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTeamDto) {
    return this.prisma.team.create({ data: dto });
  }

  findAll() {
    return this.prisma.team.findMany();
  }

  async findOne(id: string) {
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async update(id: string, dto: UpdateTeamDto) {
    await this.findOne(id); // Ensure it exists
    return this.prisma.team.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.team.delete({ where: { id } });
    return { message: 'Team deleted successfully' };
  }
}

