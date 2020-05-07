import React from 'react';

export default function Prefix(renderProps) {
    const { prefix } = renderProps.props;

    if (!prefix) {
        return null;
    }

    return (
        <div className='prefix'>
        {
            (typeof prefix === 'function')
                ? prefix(renderProps)
                : prefix
        }
        </div>
    );
};
