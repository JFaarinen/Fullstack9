import React from "react";
import { HealthCheckEntry } from "../types";
import EntryDiagnoses from "./EntryDiagnoses";
import HealthRatingBar from "../components/HealthRatingBar";
import { Icon, Card } from "semantic-ui-react";


const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="doctor" />
                </Card.Header>
                <Card.Description>
                    {entry.description}
                </Card.Description>
                {entry.diagnosisCodes
                    && <EntryDiagnoses diagnoseCodes={entry.diagnosisCodes} />
                }
            </Card.Content>
            <Card.Content>
                <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
            </Card.Content>
        </Card>
    );
};

export default HealthCheck;