import patientData from '../../data/patients';
import { Patient, SecurePatient } from '../types';

const getPatients = (): Array<Patient> => {
    return patientData;
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

export default {
    getPatients,
    getSecurePatients
};