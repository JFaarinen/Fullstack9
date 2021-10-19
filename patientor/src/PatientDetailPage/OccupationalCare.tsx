import React from "react";
import { OccupationalHealthcareEntry, SickLeave } from "../types";
import EntryDiagnoses from "./EntryDiagnoses";
import { Icon, Card } from "semantic-ui-react";

const Sickness: React.FC<{ sickLeave: SickLeave }> = ({ sickLeave }) => {
    return (
        <div>
            Sick leave: {sickLeave.startDate} - {sickLeave.endDate}
        </div>
    );
};

const OccupationalCare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date} <Icon name="stethoscope" /> {entry.employerName}
                </Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
                {entry.diagnosisCodes
                    && <EntryDiagnoses diagnoseCodes={entry.diagnosisCodes} />
                }
                {entry.sickLeave
                    && <Sickness sickLeave={entry.sickLeave} />}
            </Card.Content>
        </Card>
    );
};

export default OccupationalCare;