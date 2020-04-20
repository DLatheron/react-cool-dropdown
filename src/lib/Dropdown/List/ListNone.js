import React from 'react';

export default function ListNone({ props, methods, state }) {
    if (!props.noneOption || state.searchTerm !== '') {
        return null;
    }

    return (
        <div
            className='option none'
            onClick={event=> {
                methods.suppressEvent(event);
                methods.clearAll();
                methods.closeDropdown();
            }}
        >
            None
        </div>
    );
}