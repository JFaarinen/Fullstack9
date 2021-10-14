import React from "react";

const EntryDiagnoses: React.FC<{ diagnoses: string[] }> = ({ diagnoses }) => {
    return (
        <ul>
            {diagnoses.map((d) =>
                <li key={d}>{d}</li>
            )}
        </ul>
    );

};

export default EntryDiagnoses;