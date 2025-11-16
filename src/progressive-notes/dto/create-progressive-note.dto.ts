import { IsNotEmpty, IsString } from "class-validator";
import { ProgressiveNotesType } from "../schemas/progressive-notes.schema";

import { Patient } from "src/patients/entities/patient.entity";

import { User } from "src/users/entities/user.entity";

export class CreateProgressiveNoteDto {

    @IsString()
    @IsNotEmpty()
    notes: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    type: ProgressiveNotesType;
    
    @IsNotEmpty()
    patient: Patient;
    
    @IsNotEmpty()
    doneBy: User;
    
    @IsNotEmpty()
    notesDate: Date;
}
