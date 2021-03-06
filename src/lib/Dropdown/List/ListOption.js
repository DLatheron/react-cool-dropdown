import React from 'react';
import classNames from 'classnames';

export default function ListOption({ item, props, methods }) {
    const selected = methods.isSelected(item);
    const disabled = props.disabled || !methods.canClick(item);

    if (selected && (props.moveToTop || props.removeWhenSelected)) {
        return null;
    }

    return (
        <div
            className={
                classNames(
                    'option',
                    selected && 'selected',
                    disabled && 'disabled'
                )
            }
            onClick={
                !props.disabled
                    ? event => {
                        methods.suppressEvent(event);
                        methods.selectOption(item);
                    }
                    : undefined
            }
        >
            {methods.itemName(item)}
        </div>
    );
}