import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormConfig } from './form-config.entity';
import { FormRecord } from './form-record.entity';

@Controller('api')
export class FormConfigController {
  constructor(
    @InjectRepository(FormConfig)
    private readonly configRepo: Repository<FormConfig>,
    @InjectRepository(FormRecord)
    private readonly recordRepo: Repository<FormRecord>,
  ) {}

  @Get('form-configs')
  getConfigs() {
    return this.configRepo.find({ order: { sequence: 'ASC' } });
  }

  @Post('form-configs')
  createConfig(
    @Body()
    body: { name: string; sequence: number; fields: any },
  ) {
    const config = this.configRepo.create({
      name: body.name,
      sequence: body.sequence,
      fields: JSON.stringify(body.fields),
    });
    return this.configRepo.save(config);
  }

  @Get('form-configs/:id/export')
  async exportConfig(@Param('id') id: number) {
    const config = await this.configRepo.findOneBy({ id: +id });
    return config;
  }

  @Post('form-configs/:id/records')
  async saveRecord(@Param('id') id: number, @Body() data: any) {
    const config = await this.configRepo.findOneBy({ id: +id });
    if (!config) {
      return { success: false };
    }
    const record = this.recordRepo.create({
      form: config,
      data: JSON.stringify(data),
    });
    await this.recordRepo.save(record);
    return { success: true };
  }
}
