import React from 'react';

import ListOption from './ListOption';

export default function ListOptions(renderProps) {
    const {
        methods,
        props,
        state
    } = renderProps;

    if (state.filteredOptions.length === 0) {
        return (
            <div className='no-options'>
                {props.text.noMatches}
            </div>
        );
    }

    return state.filteredOptions.map((item, index) =>
        <ListOption key={methods.itemId(item) || index} item={item} {...renderProps}
    />);
}
