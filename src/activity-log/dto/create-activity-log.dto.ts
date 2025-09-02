import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types, Schema as MongooseSchema } from 'mongoose';

export class CreateActivityLogDto {
  @IsNotEmpty()
  patient: MongooseSchema.Types.ObjectId;;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsOptional()
  relatedId?: MongooseSchema.Types.ObjectId;;

  @IsOptional()
  details?: Record<string, any>;
}