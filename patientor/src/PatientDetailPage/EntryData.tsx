import React from 'react';
import { Entry, EntryType } from '../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalCare from './OccupationalCare';

export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryData: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case EntryType.HealthCheck:
            return <HealthCheck entry={entry} />;
        case EntryType.Hospital:
            return <Hospital entry={entry} />;
        case EntryType.OccupationalHealthcare:
            return <OccupationalCare entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryData;