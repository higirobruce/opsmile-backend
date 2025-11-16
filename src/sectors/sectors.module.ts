import { Module } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { SectorsController } from './sectors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sector } from './entities/sector.entity';
import { SectorSchema } from './schemas/sectors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: SectorSchema, name: Sector.name }]),
  ],
  controllers: [SectorsController],
  providers: [SectorsService],
})
export class SectorsModule {}
