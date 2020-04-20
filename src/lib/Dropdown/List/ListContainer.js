import React from 'react';

import List from './List';

export default function ListContainer(renderProps) {
    return (
        <div className='list-container'>
            <List {...renderProps} />
        </div>
    );
}
