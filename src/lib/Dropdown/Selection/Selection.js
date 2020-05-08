import React from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import NoSelection from './NoSelection';

export default function Selection(renderProps) {
    const {
        props,
        methods,
        state
    } = renderProps;

    switch (props.maxSelected) {
        // Single select.
        case 1:
            if (!state.open || !props.searchable) {
                if (state.selected.length > 0) {
                    return (
                        <div
                            className='single-selected-option'
                        >
                            {state.selected[0].name}
                        </div>
                    );
                } else {
                    return <NoSelection {...renderProps} />
                }
            } else {
                return null;
            }

        // Multi select.
        default :
            if (state.selected.length === 0) {
                if (!state.open) {
                    return <NoSelection {...renderProps} />
                } else {
                    return null;
                }
            } else {
                return state.selected.map(item => (
                    <div
                        key={item.id}
                        className='multi-selected-option'
                    >
                        {item.name}
                        <button
                            className={classNames(
                                'delete-button',
                                props.disabled && 'disabled'
                            )}
                            onClick={event => {
                                methods.suppressEvent(event);
                                methods.clearOption(item);
                            }}
                            disabled={props.disabled}
                        >
                            <FontAwesomeIcon
                                className='icon'
                                icon={faTimes}
                            />
                        </button>
                    </div>
                ));
            }
    }
}
