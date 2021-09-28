import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
    console.log('query: ', req.query);
    const strHeight = String(req.query.height);
    const strWeight = String(req.query.weight);

    try {
        const { height, weight, bmi } = bmiCalculator([strHeight, strWeight]);
        res.send({
            height: height,
            weight: weight,
            bmi: bmi
        });
    } catch (e) {
        res.send({ error: e.message });
    }
});

app.post('/exercises', (req, res) => {
    console.log(req.body);
    try {
        res.send(exerciseCalculator(req.body));

    } catch (e) {
        res.send({ error: e.message });
    }
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});