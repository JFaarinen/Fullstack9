import React from "react";
import { HospitalEntry } from "../types";
import EntryDiagnoses from "./EntryDiagnoses";
import { Icon, Card, List } from "semantic-ui-react";


const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="hospital" />
                </Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
                {entry.diagnosisCodes
                    && <EntryDiagnoses diagnoseCodes={entry.diagnosisCodes} />
                }
                <Card.Description>
                    <List>
                        <List.Item>
                            Discharged: {entry.discharge.date}
                        </List.Item>
                    </List>
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default Hospital;