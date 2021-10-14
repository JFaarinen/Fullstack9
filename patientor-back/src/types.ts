export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    ssn: string;
    entries: Entry[];
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export type SecurePatient = Omit<Patient, "ssn" | "entries">;
export type NewPatient = Omit<Patient, "id">;
export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;