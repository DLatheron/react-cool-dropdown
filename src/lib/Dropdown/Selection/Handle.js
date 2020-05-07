import React from 'react';

export default function Handle(renderProps) {
    const {
        props: { handle },
        methods
    } = renderProps;

    if (!handle) {
        return null;
    }

    return (
        <span
            className='handle'
            onClick={event => {
                methods.suppressEvent(event);
                methods.toggleDropdown();
            }}
        >
        {
            (typeof handle === 'function')
                ? handle(renderProps)
                : handle
        }
        </span>
    );
}