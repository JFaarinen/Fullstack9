import React from 'react';
import { CoursePart } from '../types';

const Course: React.FC<{ course: CoursePart }> = ({ course }) => {
    switch (course.type) {
        case "normal":
            return (
                <div>
                    <div>
                        <strong>
                            {course.name} {course.exerciseCount}
                        </strong>
                    </div>
                    <div>
                        <em>
                            {course.description}
                        </em>
                    </div>
                    <br />
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <div>
                        <strong>
                            {course.name} {course.exerciseCount}
                        </strong>
                    </div>
                    <div>
                        project exercises {course.groupProjectCount}
                    </div>
                    <br />
                </div>
            );
        case "submission":
            return (
                <div>
                    <div>
                        <strong>
                            {course.name} {course.exerciseCount}
                        </strong>
                    </div>
                    <div>
                        <em>
                            {course.description}
                        </em>
                    </div>
                    <div>
                        submit to <a href={course.exerciseSubmissionLink}>
                            {course.exerciseSubmissionLink}
                        </a>
                    </div>
                    <br />
                </div>
            );
        case "special":
            return (
                <div>
                    <div>
                        <strong>
                            {course.name} {course.exerciseCount}
                        </strong>
                    </div>
                    <div>
                        <em>
                            {course.description}
                        </em>
                    </div>
                    <div>
                        required skills: {course.requirements.map(r => `${r} `)}
                    </div>
                    <br />
                </div>
            );
        default:
            return assertNever(course);
    }
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};


const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
    return (
        <div>
            {
                courseParts.map(p => <Course key={p.name} course={p} />
                )}
        </div>
    );
};

export default Content;