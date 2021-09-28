export const calculateBmi = (height: number, weight: number) => {
    const bmi = (weight / Math.pow(height / 100, 2));
    let bmiCategory;
    if (bmi < 16.0) bmiCategory = 'Underweight (severe)';
    else if (bmi < 17.0) bmiCategory = 'Underweight (moderate)';
    else if (bmi < 18.5) bmiCategory = 'Underweight (mild)';
    else if (bmi < 25.0) bmiCategory = 'Normal (healthy weight)';
    else if (bmi < 30.0) bmiCategory = 'Overweight (Pre-obese)';
    else if (bmi < 35.0) bmiCategory = 'Overweight (Obese class I)';
    else if (bmi < 40.0) bmiCategory = 'Overweight (Obese class II)';
    else bmiCategory = 'Overweight (Obese class III)';

    return `BMI: ${bmi.toFixed(1)} -> ${bmiCategory}`;
}

export interface bmiValues {
    height: number;
    weight: number;
};

export const parseArguments = (args: string[]): bmiValues => {
    if (args.length < 2 || args.length > 2) {
        throw new Error('Invalid number of arguments!')
    }

    if (isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
        throw new Error('Provided values must be numbers!');
    }

    return {
        height: Number(args[0]),
        weight: Number(args[1])
    }
}

export const bmiCalculator = (args: string[]) => {
    try {
        //const args = process.argv.splice(2);
        console.log(args);
        const { height, weight } = parseArguments(args);
        const bmi = (calculateBmi(height, weight));
        return { height: height, weight: weight, bmi: bmi };
    } catch (e) {
        return e.message;
    }
}