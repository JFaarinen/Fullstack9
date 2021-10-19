import React from "react";
import { useStateValue } from "../state";

const EntryDiagnoses: React.FC<{ diagnoseCodes: string[] }> = ({ diagnoseCodes }) => {
    const [{ icdCodes }] = useStateValue();
    console.log('diagnoseData: ', icdCodes);

    return (
        <ul>
            {diagnoseCodes ? diagnoseCodes.map((c) => (
                <li key={c}>{c} {icdCodes[c].name}  </li>
            ))
                : null}
        </ul>
    );

};

export default EntryDiagnoses;