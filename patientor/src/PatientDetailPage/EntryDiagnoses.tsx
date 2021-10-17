import React from "react";
import { useStateValue } from "../state";

const EntryDiagnoses: React.FC<{ diagnoseCodes: string[] }> = ({ diagnoseCodes }) => {
    const [{ iccCodes }] = useStateValue();
    console.log('diagnoseData: ', iccCodes);

    return (
        <ul>
            {diagnoseCodes ? diagnoseCodes.map((c) => (
                <li key={c}>{c} {iccCodes[c].name}  </li>
            ))
                : null}
        </ul>
    );

};

export default EntryDiagnoses;