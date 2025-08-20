import { Controller, Post, Body, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Controller('api/admin')
export class AdminController implements OnModuleInit {
  constructor(@InjectRepository(Admin) private repo: Repository<Admin>) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      await this.repo.save({ username: 'admin', password: 'password' });
    }
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const admin = await this.repo.findOne({ where: { username: body.username } });
    if (admin && admin.password === body.password) {
      return { success: true };
    }
    return { success: false };
  }
}
