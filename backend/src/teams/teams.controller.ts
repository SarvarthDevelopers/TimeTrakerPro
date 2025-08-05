/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
// import { Controller } from '@nestjs/common';

// @Controller('teams')
// export class TeamsController {}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
// import { CreateTeamDto, UpdateTeamDto } from './dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';


@Controller('teams')
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Post()
  create(@Body() dto: CreateTeamDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

