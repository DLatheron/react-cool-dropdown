import React from 'react';

export default function Clear({ props, methods }) {
    if (methods.numSelected() === 0) {
        return null;
    }

    return (
        <span
            className='clear'
            onClick={event => {
                methods.suppressEvent(event);
                methods.clearAll();
            }}
        >
            {props.clear}
        </span>
    );
}
