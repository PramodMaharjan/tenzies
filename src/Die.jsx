import { useState } from 'react';

const Die = ({ value, holdDice }) => {
    return (
        <div className={`die ${value.isHeld && 'held'}`} onClick={() => holdDice(value.id)}>
            {value.value}
        </div>
    );
}

export default Die;