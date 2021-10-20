import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getSecurePatients());
});

router.get("/:id", (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        res.status(400).send(e.message);
    }
});

router.post("/:id/entries", (req, res) => {
    const patient = patientService.getPatientById(req.params.id);

    if (patient) {
        try {
            const entry = toNewEntry(req.body);
            const updatedPatient = patientService.addEntry(patient, entry);
            res.json(updatedPatient);
        } catch (e: any) {
            res.status(400).send(e.message);
        }
    } else {
        res.status(404).send({ error: "Patient not found!" });
    }

});

export default router;
