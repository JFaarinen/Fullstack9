import React from 'react';
import { CourseParts } from '../types';

const Content: React.FC<{ courseParts: CourseParts[] }> = ({ courseParts }) => {
    return (
        <div>
            {
                courseParts.map(p =>
                    <div key={p.name}>{p.name} {p.exerciseCount} </div>)
            }
        </div>
    );
};

export default Content;