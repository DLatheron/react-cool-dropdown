import React from 'react';

export default function ListFooter({ props }) {
    return (
        props.footer && <div className='footer'>{props.footer}</div>
    );
}
