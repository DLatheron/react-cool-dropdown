import React from 'react';
import classNames from 'classnames';

export default function ListOption({ item, props, methods }) {
    const selected = methods.isSelected(item);

    if (selected && (props.moveToTop || props.removeWhenSelected)) {
        return null;
    }

    return (
        <div
            className={
                classNames(
                    'option',
                    selected && 'selected'
                )
            }
            onClick={event => {
                methods.suppressEvent(event);
                methods.selectOption(item);
            }}
        >
            {item.name}
        </div>
    );
}