import React from 'react';

import ListOption from './ListOption';

export default function ListOptions(renderProps) {
    const {
        state,
        methods: {
            canClick
        }
    } = renderProps;

    if (state.filteredOptions.length === 0) {
        return (
            <div className='no-options'>
                No fruits matched the search term
            </div>
        );
    }

    return state.filteredOptions.map(item => <ListOption key={item.id} item={item} {...renderProps} />);
}
