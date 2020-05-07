import React from 'react';

export default function Clear(renderProps) {
    const {
        props: { clear },
        methods
    } = renderProps;

    if (!clear || methods.numSelected() === 0) {
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
        {
            (typeof clear === 'function')
                ? clear(renderProps)
                : clear
        }
        </span>
    );
}
