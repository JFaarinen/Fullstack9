import React, { useState } from 'react';
import { Grid, Button, Form as UIForm } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { TextField, DiagnosisSelection, NumberField } from '../components/FormField';
import {
    BaseEntry,
    NewEntry,
    NewHealthCheckEntry,
    NewHospitalEntry,
    NewOccupationalHealthcareEntry,
    Entry,
    EntryType
} from '../types';
import { useStateValue } from '../state';

interface Props {
    onSubmit: (data: EntryFormValues) => void;
    onCancel: () => void;
}

const entryTypeOptions: { value: Entry['type']; label: string }[] = [
    { value: EntryType.Hospital, label: "Hospital" },
    { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
    { value: EntryType.HealthCheck, label: "Health check" }
];

export interface EntryFormValues extends
    Omit<NewHospitalEntry, 'type'>,
    Omit<NewHealthCheckEntry, 'type'>,
    Omit<NewOccupationalHealthcareEntry, 'type'> {
    type: Entry['type'] | '';
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ icdCodes }] = useStateValue();
    const [formType, setFormType] = useState<NewEntry['type']>(EntryType.HealthCheck);

    const isDate = (date: string): boolean => (
        date.length === 10 && !isNaN(Date.parse(date))
    );

    const baseEntry: Omit<BaseEntry, 'id' | 'type'> = {
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: []
    };

    const hospitalValues: NewHospitalEntry = {
        ...baseEntry,
        type: EntryType.Hospital,
        discharge: {
            date: '',
            criteria: ''
        }
    };

    const occupationalHealthcareValues: NewOccupationalHealthcareEntry = {
        ...baseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: '',
        sickLeave: {
            startDate: '',
            endDate: ''
        }
    };

    const healthCheckValues: NewHealthCheckEntry = {
        ...baseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: 0
    };

    const initialValues: EntryFormValues = {
        ...baseEntry,
        ...hospitalValues,
        ...occupationalHealthcareValues,
        ...healthCheckValues,
        type: EntryType.HealthCheck
    };

    const submitValues = (values: EntryFormValues): EntryFormValues => ({
        ...values,
        sickLeave: (
            values.sickLeave?.startDate !== '' && values.sickLeave?.endDate !== ''
        ) ? values.sickLeave : undefined
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => onSubmit(submitValues(values))}
            validate={values => {
                const requiredError = 'Value is mandatory!';
                const errors: { [field: string]: ({ [subfield: string]: string } | string) } = {};

                if (!values.description) { errors.description = requiredError; }
                if (!values.specialist) { errors.specialist = requiredError; }

                if (!values.date) { errors.date = requiredError; }
                else if (!isDate(values.date)) {
                    errors.date = "Invalid date (YYYY-MM-DD)";
                }

                switch (formType) {
                    case "HealthCheck":
                        if (values.healthCheckRating === undefined) { errors.healthCheckRating = requiredError; }
                        else if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
                            errors.healthCheckRating = "Invalid range (0-3)";
                        }
                        break;

                    case "Hospital":
                        if (!values.discharge.criteria) { errors.discharge = { criteria: requiredError }; }
                        if (!values.discharge.date) { errors["discharge.date"] = requiredError; }
                        else if (!isDate(values.discharge.date)) {
                            errors.discharge = { date: "Invalid date (YYYY-MM-DD)" };
                        }
                        break;

                    case "OccupationalHealthcare":
                        if (!values.employerName) { errors.employerName = requiredError; }

                        if (values.sickLeave?.startDate && !isDate(values.sickLeave.startDate)) {
                            errors.sickLeave = { startDate: "Invalid date (YYYY-MM-DD)" };
                        }

                        if (values.sickLeave?.endDate && !isDate(values.sickLeave.endDate)) {
                            errors.sickLeave = { endDate: "Invalid date (YYYY-MM-DD)" };
                        }

                        break;
                }

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <UIForm.Select
                            label="Entry type"
                            name="type"
                            value={formType}
                            onChange={(_event, data) => {
                                setFormType(data.value as Entry['type']);
                                setFieldTouched('type', true);
                                setFieldValue('type', data.value as Entry['type']);
                            }}
                            options={entryTypeOptions.map(({ value, label: text }) => (
                                { key: value, value, text }
                            ))}
                        />

                        <Field
                            label="Description"
                            name="description"
                            placeholder="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            name="date"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            name="specialist"
                            placeholder="Specialist"
                            component={TextField}
                        />

                        {
                            formType === 'HealthCheck' &&
                            <Field
                                label="Health Check Rating"
                                name="healthCheckRating"
                                component={NumberField}
                                min={0}
                                max={3}
                            />
                        }
                        {
                            formType === 'Hospital' &&
                            <>
                                <Field
                                    label="Discharge Date"
                                    name="discharge.date"
                                    placeholder="YYYY-MM-DD"
                                    component={TextField}
                                />
                                <Field
                                    label="Criteria"
                                    name="discharge.criteria"
                                    placeholder="criteria"
                                    component={TextField}
                                />
                            </>
                        }

                        {
                            formType === 'OccupationalHealthcare' &&
                            <>
                                <Field
                                    label="Employer"
                                    name="employerName"
                                    placeholder="Employer"
                                    component={TextField}
                                />
                                <Field
                                    label="Sick Leave: Start"
                                    name="sickLeave.startDate"
                                    placeholder="YYYY-MM-DD"
                                    component={TextField}
                                />
                                <Field
                                    label="Sick Leave (End)"
                                    name="sickLeave.endDate"
                                    placeholder="YYYY-MM-DD"
                                    component={TextField}
                                />
                            </>
                        }

                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(icdCodes)}
                        />

                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;