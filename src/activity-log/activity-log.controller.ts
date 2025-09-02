import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}
  @Get('patient/:patientId')
  async findPatientTimeline(@Param('patientId') patientId: string) {
    return this.activityLogService.findByPatientId(patientId);
  }
}