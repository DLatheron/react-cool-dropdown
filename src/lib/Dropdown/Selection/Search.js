import React from 'react';

export default function Search(renderProps) {
    const {
        methods,
        props,
        state
    } = renderProps;

    if (!props.searchable || !state.open || props.disabled) {
        return null;
    }

    return (
        <input
            ref={state.searchRef}
            className='search'
            type='text'
            value={state.searchTerm}
            onChange={event => methods.search(event.target.value)}
            placeholder={props.searchPlaceholder}
            disabled={props.disabled}
            autoFocus
        />
    )
}