import React from 'react';
import classNames from 'classnames';

export default function ListSelected({ props, methods, state }) {
    if (!props.moveToTop || state.selected.length === 0 || state.searchTerm !== '') {
        return null;
    }

    return (
        state.selected.map(item => (
            <div
                key={item.id}
                className={
                    classNames(
                        'option',
                        'selected'
                    )
                }
                onClick={event => {
                    methods.suppressEvent(event);
                    methods.selectOption(item);
                }}
            >
                {item.name}
            </div>
        ))
    );
}
