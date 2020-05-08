import React from 'react';
import classNames from 'classnames';

export default function Handle(renderProps) {
    const {
        props,
        methods
    } = renderProps;

    if (!props.handle) {
        return null;
    }

    return (
        <button
            className={classNames(
                'handle',
                props.disabled && 'disabled'
            )}
            onClick={event => {
                methods.suppressEvent(event);
                methods.toggleDropdown();
            }}
            disabled={props.disabled}
        >
        {
            (typeof props.handle === 'function')
                ? props.handle(renderProps)
                : props.handle
        }
        </button>
    );
}