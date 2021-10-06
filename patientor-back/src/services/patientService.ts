import patientData from "../../data/patients";
import { NewPatient, Patient, SecurePatient } from "../types";
import { v4 as uuid } from "uuid";

const getPatients = (): Array<Patient> => {
    return patientData;
};

const getPatientById = (id: string): Patient | undefined => {
    return patientData.find((p) => p.id === id);
};

const getSecurePatients = (): Array<SecurePatient> => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) =>
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

    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getSecurePatients,
    getPatientById,
    addPatient
};