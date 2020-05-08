import React from 'react';
import classNames from 'classnames';

export default function Clear(renderProps) {
    const {
        props,
        methods
    } = renderProps;

    if (!props.clear || methods.numSelected() === 0) {
        return null;
    }

    return (
        <button
            className={classNames(
                'clear',
                props.disabled && 'disabled'
            )}
            onClick={event => {
                methods.suppressEvent(event);
                methods.clearAll();
            }}
            disabled={props.disabled}

        >
        {
            (typeof props.clear === 'function')
                ? props.clear(renderProps)
                : props.clear
        }
        </button>
    );
}
