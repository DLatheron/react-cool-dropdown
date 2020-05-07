import React from 'react';

import Prefix from './Prefix';
import Selection from './Selection';
import Clear from './Clear';
import Suffix from './Suffix';
import Handle from './Handle';
import Search from './Search';

export default function SelectionContainer(renderProps) {
    const {
        props,
        state
    } = renderProps;

    return (
        <div
            className='selection-container'
            onClick={() => state.searchRef.current && state.searchRef.current.focus()}
        >
            {props.prefix && <Prefix {...renderProps} />}

            <div className='selection'>
                <Selection {...renderProps} />

                <Search {...renderProps} />
            </div>

            {props.clear && <Clear {...renderProps} />}
            {props.suffix && <Suffix {...renderProps} />}
            {props.handle && <Handle {...renderProps} />}
        </div>
    );
}
