import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalAssessmentDto } from './create-medical-assessment.dto';

export class UpdateMedicalAssessmentDto extends PartialType(CreateMedicalAssessmentDto) {
    nurseNotes?: string;
    performedBy?: string;
    /* VITALS ---------------------------------------------------------- */
    temperature?: number;
    weight?: number;
    height?: number;
    systolicBP?: number;
    diastolicBP?: number;
    pulseRate?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
}
