import patientData from "../../data/patients";
import { NewPatient, Patient, SecurePatient, Entry, NewEntry } from "../types";
import { v4 as uuid } from "uuid";

let patients = [...patientData];

const getPatients = (): Array<Patient> => {
    return patients;
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find((p) => p.id === id);
};

const getSecurePatients = (): Array<SecurePatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) =>
    ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const entry: Entry = { ...newEntry, id: uuid() };
    const updatedPatient = { ...patient, entries: patient.entries.concat(entry) };
    patients = patientData.map((p) =>
        p.id === updatedPatient.id ? updatedPatient : p
    );
    return updatedPatient;
};

export default {
    getPatients,
    getSecurePatients,
    getPatientById,
    addPatient,
    addEntry
};