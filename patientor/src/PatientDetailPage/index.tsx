import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useStateValue, addPatient, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";
import { Patient, Gender, Entry } from "../types";
import EntryData from "./EntryData";
import { Button } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

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
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();


    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (data: EntryFormValues) => {
        console.log('submitNewEntry:', data);

        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patient.id}/entries`, data);
            dispatch(updatePatient(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };


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

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>


        </div>
    );
};

export default PatientDetailPage;