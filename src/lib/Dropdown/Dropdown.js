import React, { useMemo, useRef, useReducer } from 'react';
import classNames from 'classnames';
import { useOutsideClick } from '../Hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'

import './Dropdown.scss';

function initialState({ open }) {
    return {
        open,
        selected: [],
        searchTerm: ''
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'open':
            return {
                ...state,
                open: true
            };

        case 'close':
            return {
                ...state,
                open: false,
                searchTerm: ''
            };

        case 'toggle':
            return {
                ...state,
                open: !state.open
            };

        case 'clearSearch':
            return {
                ...state,
                searchTerm: ''
            };

        case 'setSearchTerm':
            return {
                ...state,
                searchTerm: action.searchTerm
            };

        case 'clearSelected':
            return {
                ...state,
                selected: []
            };

        case 'setSelected':
            return {
                ...state,
                selected: action.selected
            };

        default:
            throw new Error(`Uncognised action type ${action.type}`);
    }
}

export default function Dropdown(props) {
    const {
        prefix,
        clear = <FontAwesomeIcon icon={faTimes} />,
        suffix,
        handle = ({ state }) => <FontAwesomeIcon icon={state.open ? faCaretUp : faCaretDown} />,
        open = false,
        options = [],
        header,
        footer,
        sortFn,
        filterFn,
        maxSelected = 1,
        noneOption = false
    } = props;

    const dropdownRef = useRef();
    const searchRef = useRef();

    const [state, dispatch] = useReducer(reducer, initialState({ open }));

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
        dispatch({ type: 'toggle' });
    };
    const closeDropdown = () => {
        dispatch({ type: 'close' });
    };
    const openDropdown = () => {
        dispatch({ type: 'open' });
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

        dispatch({ type: 'setSelected', selected: newSelected });
        if (open === false) {
            dispatch({ type: 'close' });
        }

        // Return focus to search.
        searchRef.current && searchRef.current.focus();
        // searchRef.current.scrollIntoView();
    };
    const clearOption = item => {
        console.info('clearOption', item);
        dispatch({ type: 'setSelected', selected: [...state.selected.filter(i => item !== i)] });
    };
    const clearAll = () => {
        console.info('Clear All');

        dispatch({ type: 'clearSelected' });
    }

    const search = searchTerm => {
        dispatch({ type: 'setSearchTerm', searchTerm });
    };

    useOutsideClick(dropdownRef, () => closeDropdown());

    return (
        <div
            ref={dropdownRef}
            className='dropdown'
            onClick={event => {
                if (!state.open) {
                    event.preventDefault();
                    event.stopPropagation();
                    event.nativeEvent.stopImmediatePropagation();

                    openDropdown();
                }
            }}
        >
            <div
                className='selection-box'
                onClick={() => searchRef.current && searchRef.current.focus()}
            >
                {prefix && <span className='prefix'>{prefix}</span>}

                <div className='selected'>
                    {
                        (maxSelected === 1)
                            ? !state.open && (state.selected.length > 0
                                ? <div
                                    className='single-selected-option'
                                >
                                    {state.selected[0].name}
                                </div>
                                : <div className='no-selected-option'>None</div>)
                            : <>
                                {
                                    state.selected.length === 0
                                        ? <div className='no-selected-option'>
                                            None
                                        </div>
                                        : state.selected.map(item => (
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
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                event.nativeEvent.stopImmediatePropagation();

                                                                clearOption(item);
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
                            onClick={event => {
                                event.preventDefault();
                                event.stopPropagation();
                                event.nativeEvent.stopImmediatePropagation();

                                clearAll();
                            }}
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
                            noneOption && state.searchTerm === '' &&
                                <div
                                    className='option none'
                                    onClick={() => {
                                        clearAll();
                                        closeDropdown();
                                    }}
                                >
                                    None
                                </div>
                        }
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
