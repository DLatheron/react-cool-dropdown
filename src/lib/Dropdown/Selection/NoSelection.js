import React from 'react';

export default function NoSelection(renderProps) {
    const { noneSelected } = renderProps.props.text

    return <div className='no-selected-option'>{noneSelected}</div>;
}