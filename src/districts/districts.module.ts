import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DistrictSchema } from './schemas/districts.schema';

@Module({
  imports: [MongooseModule.forFeature([{ schema: DistrictSchema, name: 'District' }])],
  controllers: [DistrictsController],
  providers: [DistrictsService],
})
export class DistrictsModule { }
