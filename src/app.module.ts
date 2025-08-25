import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { FormConfig } from './form-config.entity';
import { FormRecord } from './form-record.entity';
import { AdminController } from './admin.controller';
import { FormConfigController } from './form-config.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mongodb',
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/forms',
        entities: [Admin, FormConfig, FormRecord],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Admin, FormConfig, FormRecord]),
  ],
  controllers: [AdminController, FormConfigController],
  providers: [],
})
export class AppModule {}
