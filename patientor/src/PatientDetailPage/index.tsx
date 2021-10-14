import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useStateValue, addPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";
import { Patient, Gender, Entry } from "../types";
import EntryData from "./EntryData";

const GenderIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
    switch (gender) {
        case 'male':
            return <Icon name="mars" />;
        case 'female':
            return <Icon name="venus" />;
        case 'other':
            return <Icon name="genderless" />;
        default:
            return <Icon name="genderless" />;
    }
};


const PatientDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();

    const patient: Patient = patients[id];
    console.log('patientData: ', patient);

    const fetchPatientData = async (id: string) => {
        try {
            const { data: patientDetails } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            console.log('found patient: ', patientDetails);
            dispatch(addPatient(patientDetails));
        } catch (e) {
            console.error(e);
        }
    };

    if (!patient.ssn) {
        void fetchPatientData(id);
    }

    return (
        <div>
            <h2>{patient.name} <GenderIcon gender={patient.gender} /></h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation} </p>
            <h3>Entries</h3>
            {patient.entries &&
                patient.entries.map((entry: Entry) =>
                    <EntryData key={entry.id} entry={entry} />
                )
            }

        </div>
    );
};

export default PatientDetailPage;