import { Module } from '@nestjs/common';
import { CellsService } from './cells.service';
import { CellsController } from './cells.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { Cell } from './entities/cell.entity';
import { CellSchema } from './schemas/cells.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: CellSchema, name: Cell.name }]),
  ],
  controllers: [CellsController],
  providers: [CellsService],
})
export class CellsModule {}
