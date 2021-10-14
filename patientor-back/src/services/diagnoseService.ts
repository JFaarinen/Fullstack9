import diagnosis from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnosis = (): Array<Diagnosis> => {
    return diagnosis;
};

export default {
    getDiagnosis
};