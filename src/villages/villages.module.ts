import { Module } from '@nestjs/common';
import { VillagesService } from './villages.service';
import { VillagesController } from './villages.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Village } from './entities/village.entity';
import { VillageSchema } from './schema/villages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: VillageSchema, name: Village.name }]),
  ],
  controllers: [VillagesController],
  providers: [VillagesService],
})
export class VillagesModule {}
