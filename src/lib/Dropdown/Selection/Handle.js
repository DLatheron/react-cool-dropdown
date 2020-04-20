import React from 'react';

export default function Handle(renderProps) {
    const {
        props,
        methods
    } = renderProps;

    return (
        <span
            className='handle'
            onClick={event => {
                methods.suppressEvent(event);
                methods.toggleDropdown();
            }}
        >
            {props.handle(renderProps)}
        </span>
    );
}