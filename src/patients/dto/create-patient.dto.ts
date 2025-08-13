export class CreatePatientDto {
    id: string
    firstName: string
    lastName: string
    gender: 'F' | 'M'
    phoneNumber: string
    email: string
    countryOfBirth: string
    status: 'Active' | 'Inactive'
}
