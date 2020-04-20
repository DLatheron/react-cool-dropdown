import React from 'react';
import classNames from 'classnames';

import ListHeader from './ListHeader';
import ListNone from './ListNone';
import ListSelected from './ListSelected';
import ListOptions from './ListOptions';
import ListFooter from './ListFooter';

export default function List(renderProps) {
    const {
        props,
        state
    } = renderProps;

    return (
        <div
            className={
                classNames(
                    'option-menu',
                    state.open ? 'open' : 'closed'
                )
            }
        >
            {props.header && <ListHeader {...renderProps} />}
            <div className='body'>
                <ListNone {...renderProps} />
                <ListSelected {...renderProps} />
                <ListOptions {...renderProps} />
            </div>
            {props.footer && <ListFooter {...renderProps} />}
        </div>
    );
}
