import React from 'react';
import instruction from '../resources/instructions';

class Instructions extends React.Component {

    render() {
        return (
            <div className="m-4">
                <h1>{instruction.title}</h1>
                <ul>
                    {instruction.instructions.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Instructions;