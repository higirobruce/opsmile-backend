export class CreateUserDto {
    id: string
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
    role: 'admin' | 'user' | 'superadmin' | 'registration-clerk' | 'nurse' | 'physician' | 'surgeon' |
        'anesthetist' | 'lab-technician' | 'discharge-coordinator' | 'follow-up-nurse' | 'pharmacist'
        | 'auditor' | 'patient'
}
