import React from 'react';

export default function ListFooter(renderProps) {
    const { footer } = renderProps.props;

    if (!footer) {
        return null;
    }

    return (
        <div className='footer'>
        {
            (typeof footer === 'function')
                ? footer(renderProps)
                : footer
        }
        </div>
    );
}
