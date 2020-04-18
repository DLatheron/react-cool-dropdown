import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'

import './Dropdown.scss';

export default function Dropdown({
    prefix,
    clear = <FontAwesomeIcon icon={faTimes} />,
    suffix,
    handle = ({ state }) => <FontAwesomeIcon icon={state.open ? faCaretUp : faCaretDown} />,
    open,
    options = [],
    header,
    footer,
    sortFn,
    filterFn,
    maxSelected = 1
}) {
    const searchRef = useRef();
    const [state, setState] = useState({
        open,
        selected: [],
        searchTerm: ''
    });
    const sortedOptions = useMemo(() => (
        sortFn
            ? [...options].sort(sortFn)
            : options
    ), [options, sortFn]);
    const filteredOptions = useMemo(() => (
        (filterFn && state.searchTerm !== '')
            ? sortedOptions.filter(item => filterFn(state.searchTerm, item))
            : sortedOptions
    ), [sortedOptions, state.searchTerm, filterFn]);

    const toggleDropdown = () => {
        setState({
            ...state,
            open: !state.open,
            searchTerm: ''
        });
    };

    const isSelected = item => state.selected.find(i => item === i);
    const numSelected = () => state.selected.length;

    const selectOption = item => {
        let newSelected;
        let open = state.open;

        if (maxSelected === 1) {
            newSelected = [item];
            open = false;
        } else if (maxSelected === 0) {
            if (isSelected(item)) {
                newSelected = [...state.selected.filter(i => item !== i)];
            } else {

                newSelected = [
                    ...state.selected,
                    item
                ];
            }
        } else {
            console.warn('TODO: Support a limited number of selections...');
        }

        setState({
            ...state,
            selected: newSelected,
            open
        });

        // Return focus to search.
        searchRef.current && searchRef.current.focus();
        // searchRef.current.scrollIntoView();
    };
    const clearOption = item => {
        console.info('clearOption', item);
        setState({
            ...state,
            selected: [...state.selected.filter(i => item !== i)]
        });
    };
    const clearAll = () => {
        setState({
            ...state,
            selected: []
        });
    }

    const search = searchTerm => {
        setState({
            ...state,
            searchTerm
        })
    };

    return (
        <div className='dropdown'>
            <div
                className='selection-box'
                onClick={() => searchRef.current && searchRef.current.focus()}
            >
                {prefix && <span className='prefix'>{prefix}</span>}

                <div className='selected'>
                    {
                        (maxSelected === 1)
                            ? !state.open && (state.selected.length > 0
                                ? <div className='single-selected-option'>
                                    {state.selected[0].name}
                                </div>
                                : <div className='no-selected-option'>
                                    None
                                </div>)
                            : <>
                                {
                                    state.selected.map(item => (
                                        <div
                                            key={item.id}
                                            className='multi-selected-option'
                                        >
                                            {item.name}
                                            <span
                                                className='delete-button'
                                            >
                                                <FontAwesomeIcon
                                                    className='icon'
                                                    icon={faTimes}
                                                    onClick={event => {
                                                        clearOption(item);
                                                        event.stopPropagation();
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    ))
                                }
                            </>
                    }

                    {
                        state.open &&
                            <input
                                ref={searchRef}
                                className='search'
                                type='text'
                                value={state.searchTerm}
                                onChange={event => search(event.target.value)}
                                placeholder='Search'
                                autoFocus
                            />
                    }
                </div>

                {
                    clear && numSelected() > 0 &&
                        <span
                            className='clear'
                            onClick={clearAll}
                        >
                            {clear}
                        </span>
                }
                {suffix && <span className='suffix'>{suffix}</span>}
                {
                    handle &&
                        <span
                            className='handle'
                            onClick={toggleDropdown}
                        >
                            {handle({ state })}
                        </span>
                }
            </div>
            <div className='anchor'>
                <div
                    className={
                        classNames(
                            'option-menu',
                            state.open ? 'open' : 'closed'
                        )
                    }
                >
                    {header && <div className='header'>{header}</div>}
                    <div className='body'>
                        {
                            filteredOptions.length === 0
                                ? <div className='no-options'>
                                    No fruits matched the search term
                                </div>
                                : filteredOptions.map(item => (
                                    <div
                                        key={item.id}
                                        className={
                                            classNames(
                                                'option',
                                                isSelected(item) && 'selected'
                                            )
                                        }
                                        onClick={() => selectOption(item)}
                                    >
                                        {item.name}
                                    </div>
                                ))
                        }
                    </div>
                    {footer && <div className='footer'>{footer}</div>}
                </div>
            </div>
        </div>
    );
}