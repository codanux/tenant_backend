import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InovicesService } from './inovices.service';
import { CreateInoviceDto } from './dto/create-inovice.dto';
import { UpdateInoviceDto } from './dto/update-inovice.dto';

@Controller('inovices')
export class InovicesController {
  constructor(private readonly inovicesService: InovicesService) {}

  @Post()
  create(@Body() createInoviceDto: CreateInoviceDto) {
    return this.inovicesService.create(createInoviceDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.inovicesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.inovicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInoviceDto: UpdateInoviceDto) {
    return this.inovicesService.update(+id, updateInoviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inovicesService.remove(+id);
  }
}
