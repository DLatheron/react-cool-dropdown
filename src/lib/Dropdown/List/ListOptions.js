import React from 'react';

import ListOption from './ListOption';

export default function ListOptions(renderProps) {
    const {
        props: { text },
        state: { filteredOptions }
    } = renderProps;

    if (filteredOptions.length === 0) {
        return (
            <div className='no-options'>
                {text.noMatches}
            </div>
        );
    }

    return filteredOptions.map(item => <ListOption key={item.id} item={item} {...renderProps} />);
}
