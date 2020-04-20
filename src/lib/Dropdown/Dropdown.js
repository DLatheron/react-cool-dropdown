import React, { useMemo, useRef, useReducer } from 'react';
import { useOutsideClick } from '../Hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'

import ListContainer from './List/ListContainer';
import SelectionContainer from './Selection/SelectionContainer';

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

Dropdown.defaultProps = {
    prefix: undefined,
    suffix: undefined,
    open: false,
    options: [],
    sortFn: undefined,
    filterFn: undefined,
    maxSelected: 1,
    clear: <FontAwesomeIcon icon={faTimes} />,
    handle: ({ state }) => <FontAwesomeIcon icon={state.open ? faCaretUp : faCaretDown} />,
};

export default function Dropdown(props) {
    const dropdownRef = useRef();
    const searchRef = useRef();

    const [state, dispatch] = useReducer(reducer, initialState({ open: props.open }));

    const sortedOptions = useMemo(() => (
        props.sortFn
            ? [...props.options].sort(props.sortFn)
            : props.options
    ), [props.options, props.sortFn]);

    const {
        filterFn
    } = props;

    const filteredOptions = useMemo(() => (
        (filterFn && state.searchTerm !== '')
            ? sortedOptions.filter(item => filterFn(state.searchTerm, item))
            : sortedOptions
    ), [sortedOptions, state.searchTerm, filterFn]);

    const methods = {
        toggleDropdown: () => {
            console.info('toggle');
            dispatch({ type: 'toggle' });
        },
        closeDropdown: () => {
            console.info('close');
            dispatch({ type: 'close' });
        },
        openDropdown: () => {
            console.info('open');
            dispatch({ type: 'open' });
        },
        suppressEvent: event => {
            event.preventDefault();
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        },
        isSelected: item => state.selected.find(i => item === i),
        numSelected: () => state.selected.length,
        selectOption: item => {
            let newSelected;
            let open = state.open;

            if (props.maxSelected === 1) {
                newSelected = [item];
                open = false;
            } else if (props.maxSelected === 0) {
                if (methods.isSelected(item)) {
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
        },
        clearOption: item => {
            console.info('clearOption', item);
            dispatch({ type: 'setSelected', selected: [...state.selected.filter(i => item !== i)] });
        },
        clearAll: () => {
            console.info('Clear All');

            dispatch({ type: 'clearSelected' });
        },
        search: searchTerm => {
            dispatch({ type: 'setSearchTerm', searchTerm });
        }
    };

    useOutsideClick(dropdownRef, () => methods.closeDropdown());

    const renderProps = {
        props,
        methods,
        state: {
            ...state,
            filteredOptions,
            searchRef
        }
    };

    return (
        <div
            ref={dropdownRef}
            className='dropdown'
            onClick={event => {
                if (!state.open) {
                    methods.suppressEvent(event);
                    methods.openDropdown();
                }
            }}
        >
            <SelectionContainer {...renderProps} />
            <ListContainer {...renderProps} />
        </div>
    );
}
