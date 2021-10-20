import {
    NewPatient,
    Gender,
    HealthCheckRating,
    SickLeave,
    Discharge,
    NewBaseEntry,
    NewEntry,
    EntryType,
    Diagnosis,
} from "./types";

const parseString = (param: unknown, type: string): string => {
    if (!param || !isString(param)) {
        throw new Error(`Incorrect or missing string ${type}`);
    }
    return param;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};

const parseEntryType = (entryType: unknown): EntryType => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error("Incorrect or missing health check rating");
    }
    return entryType;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect or missing health check rating");
    }
    return healthCheckRating;
};

const parseDate = (date: unknown, type: string): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date ${type}`);
    }
    return date;
};

const parseSickLeave = (object: any): SickLeave => {
    if (!object) {
        throw new Error("Missing data: sick leave!");
    }
    return {
        startDate: parseDate(object.startDate, "start date"),
        endDate: parseDate(object.endDate, "end date")
    };
};

const parseDischarge = (object: any): Discharge => {
    if (!object) {
        throw new Error('Missing data: discharge!');
    }
    return {
        date: parseDate(object.date, "discharge date"),
        criteria: parseString(object.criteria, "discharge criteria")
    };
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
    if (!Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
        throw new Error("Missing data: diagnoses!");
    }
    return diagnosisCodes;
};

type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, ssn, dateOfBirth, gender, occupation }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(name, "name"),
        ssn: parseString(ssn, "ssn"),
        dateOfBirth: parseDate(dateOfBirth, "date of birth"),
        gender: parseGender(gender),
        occupation: parseString(occupation, "occupation"),
        entries: []
    };
    return newPatient;
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const isStringArray = (param: any[]): param is string[] => {
    const notString = param.some((s) => {
        return !isString(s);
    });
    return !notString;
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
    const baseEntry: NewBaseEntry = {
        type: parseEntryType(object.type),
        description: parseString(object.description, "entry description"),
        date: parseDate(object.date, "base entry date"),
        specialist: parseString(object.specialist, "specialist")
    };

    if (object.diagnosisCodes) {
        baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    return baseEntry;
};

export const toNewEntry = (object: any): NewEntry => {
    const baseEntry = toNewBaseEntry(object) as NewEntry;

    switch (baseEntry.type) {
        case EntryType.HealthCheck:
            return {
                ...baseEntry,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case EntryType.OccupationalHealthcare:
            const occupationalEntry = {
                ...baseEntry,
                employerName: parseString(object.employerName, "employer name")
            };
            if (object.sickLeave) {
                occupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            return occupationalEntry;
        case EntryType.Hospital:
            return {
                ...baseEntry,
                discharge: parseDischarge(object.discharge)
            };
        default:
            return assertNever(baseEntry);
    }
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};