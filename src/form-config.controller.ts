import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { FormConfig } from './form-config.entity';
import { FormRecord } from './form-record.entity';
import { ObjectId } from 'mongodb';

@Controller('api')
export class FormConfigController {
  constructor(
    @InjectRepository(FormConfig)
    private readonly configRepo: MongoRepository<FormConfig>,
    @InjectRepository(FormRecord)
    private readonly recordRepo: MongoRepository<FormRecord>,
  ) {}

  @Get('form-configs')
  getConfigs() {
    return this.configRepo.find({ order: { sequence: 1 as any } });
  }

  @Post('form-configs')
  createConfig(
    @Body()
    body: { name: string; sequence: number; fields: any[] },
  ) {
    const config = this.configRepo.create({
      name: body.name,
      sequence: body.sequence,
      fields: body.fields,
    });
    return this.configRepo.save(config);
  }

  @Get('form-configs/:id/export')
  async exportConfig(@Param('id') id: string) {
    const config = await this.configRepo.findOne({ where: { _id: new ObjectId(id) } });
    return config;
  }

  @Post('form-configs/:id/records')
  async saveRecord(@Param('id') id: string, @Body() data: any) {
    const config = await this.configRepo.findOne({ where: { _id: new ObjectId(id) } });
    if (!config) {
      return { success: false };
    }
    const record = this.recordRepo.create({
      formId: config.id,
      data,
    });
    await this.recordRepo.save(record);
    return { success: true };
  }
}
