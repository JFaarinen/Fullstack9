import React from 'react';
import EntryDiagnoses from './EntryDiagnoses';
import { Entry } from '../types';

const EntryData: React.FC<{ entry: Entry }> = ({ entry }) => {
    return (
        <div>
            {entry.date} {entry.description} <br />
            {entry.diagnosisCodes &&
                <EntryDiagnoses diagnoses={entry.diagnosisCodes} />
            }
        </div>
    );
};

export default EntryData;