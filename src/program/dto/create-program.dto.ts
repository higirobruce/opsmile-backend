import { IsString, IsOptional, IsDateString, IsArray, IsMongoId } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateProgramDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  location?: string;


  @IsMongoId()
  @IsOptional()
  coordinatorId: string;

  @IsArray()
  @IsOptional()
  patients?: MongooseSchema.Types.ObjectId[];

  @IsArray()
  @IsOptional()
  participants?: MongooseSchema.Types.ObjectId[];
}