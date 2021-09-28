export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export interface ExerciseData {
    target: number;
    values: number[];
}

const exerciseResults = (ex: ExerciseData): Result => {
    const { target, values } = ex;
    const avg = (values.reduce((total, v) => total + v)) / values.length;
    let rating;
    let desc;

    if (avg < target * 0.75) {
        rating = 1;
        desc = 'ei menny kaksisesti';
    } else if (avg <= target) {
        rating = 2;
        desc = 'meni ihan kohtalaisesti';
    } else {
        rating = 3;
        desc = 'meni ylisuorittamisen puolelle';
    }

    return {
        periodLength: values.length,
        trainingDays: values.filter(v => v > 0).length,
        success: (avg > target),
        rating: rating,
        ratingDescription: desc,
        target: target,
        average: avg
    }

}

export const parseData = (ex: any) => {
    if (!ex.daily_exercises || !ex.target) throw new Error('Parameters missing!');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!isNumber(ex.target) || !ex.daily_exercises.some(n => isNumber(n))) throw new Error('Malformatted data!');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values = ex.daily_exercises.map(n => Number(n));
    return {
        target: Number(ex.target),
        values: values
    }
}

const isNumber = (a: any): boolean => {
    if (isNaN(Number(a))) {
        return false;
    } else {
        return true;
    }
}

export const exerciseCalculator = (ex: any): Result => {
    try {
        const data = parseData(ex);
        return exerciseResults(data);
    } catch (e) {
        return e.message;
    }
}