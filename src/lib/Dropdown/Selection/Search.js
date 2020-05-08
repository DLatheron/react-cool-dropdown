import React from 'react';

export default function Search(renderProps) {
    const { searchable } = renderProps.props;
    if (!searchable) {
        return null;
    }

    const { open } = renderProps.state;

    if (!open) {
        return null;
    }

    const { searchRef, searchTerm  } = renderProps.state;
    const { searchPlaceholder } = renderProps.props.text;
    const { search } = renderProps.methods;

    return (
        <input
            ref={searchRef}
            className='search'
            type='text'
            value={searchTerm}
            onChange={event => search(event.target.value)}
            placeholder={searchPlaceholder}
            autoFocus
        />
    )
}