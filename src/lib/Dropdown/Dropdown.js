import React, { useMemo, useRef, useReducer } from 'react';
import { useOutsideClick } from '../Hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faTimes, faBreadSlice } from '@fortawesome/free-solid-svg-icons'

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
    open: false,
    prefix: undefined,
    suffix: undefined,
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

    // TODO: If maxSelected is not 0 and the state.selected.length is greater than the maxSelected then chop off the end of the selection...

    const methods = {
        toggleDropdown: () => {
            dispatch({ type: 'toggle' });
        },
        closeDropdown: () => {
            dispatch({ type: 'close' });
        },
        openDropdown: () => {
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
            let maxSelected = props.maxSelected;

            switch (maxSelected) {
                case 0:
                    if (methods.isSelected(item)) {
                        newSelected = [...state.selected.filter(i => item !== i)];
                    } else {
                        newSelected = [
                            ...state.selected,
                            item
                        ];
                    }
                    break;

                case 1:
                    newSelected = [item];
                    open = false;
                    break;

                default:
                    throw new Error(`TODO: Support a limited number of selections... ${maxSelected}`);
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
            dispatch({ type: 'setSelected', selected: [...state.selected.filter(i => item !== i)] });
        },
        clearAll: () => {
            dispatch({ type: 'clearSelected' });
        },
        search: searchTerm => {
            dispatch({ type: 'setSearchTerm', searchTerm });
        }
    };

    // TODO: Need to make methods safe so they don't change...
    useOutsideClick(dropdownRef, methods.closeDropdown, state.open);

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
