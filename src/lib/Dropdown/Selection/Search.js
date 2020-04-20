import React from 'react';

export default function Search({ methods, state }) {
    if (!state.open) {
        return null;
    }

    return (
        <input
            ref={state.searchRef}
            className='search'
            type='text'
            value={state.searchTerm}
            onChange={event => methods.search(event.target.value)}
            placeholder='Search'
            autoFocus
        />
    )
}