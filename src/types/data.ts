// src/types/data.ts
export { };
export interface User {
    id: string;
    name: string;
    role: string;
    username: string;
    password: string;
}

export interface Patient extends User {
    email: string;
    triageData?: TriageData[];
}

export interface TriageData {
    id: string;
    patientId: string;
    patientName: string;
    age: string;
    gender: string;
    symptoms: string[];
    painLevel: string;
    duration: string;
    medicalHistory: string[];
    additionalNotes: string;
    severity: string;
    triageStatus: string;
    nurseNotes?: string;
    appointmentTime?: string;
    doctorNotes?: string;
    prescription?: string;
    pharmacistNotes?: string;
}

export interface DataStructure {
    users: User[];
    patients: Patient[];
}