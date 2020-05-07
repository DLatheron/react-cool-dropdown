import React from 'react';

export default function Suffix(renderProps) {
    const { suffix } = renderProps.props;

    if (!suffix) {
        return null;
    }

    return (
        <div className='suffix'>
        {
            (typeof suffix === 'function')
                ? suffix(renderProps)
                : suffix
        }
        </div>
    );
};
