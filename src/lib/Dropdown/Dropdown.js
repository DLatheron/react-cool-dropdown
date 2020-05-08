import React, { useEffect, useMemo, useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useOutsideClick } from '../Hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faTimes } from '@fortawesome/free-solid-svg-icons'

import ListContainer from './List/ListContainer';
import SelectionContainer from './Selection/SelectionContainer';

import './Dropdown.scss';

function initialState({ open }) {
    return {
        open,
        searchTerm: '',
        selected: [],
        selectedSet: new Set()
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
                selected: [],
                selectedSet: new Set()
            };

        case 'setSelected':
            return {
                ...state,
                selected: action.selected,
                selectedSet: new Set(action.selected)
            };

        default:
            throw new Error(`Uncognised action type ${action.type}`);
    }
}

Dropdown.propTypes = {
    open: PropTypes.bool,
    prefix: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    suffix: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ])
    ),
    sortFn: PropTypes.func,
    filterFn: PropTypes.func,
    maxSelected: PropTypes.number,
    clear: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    handle: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]),
    text: PropTypes.shape({
        noMatches: PropTypes.string,
        noneSelected: PropTypes.string,
        searchPlaceholder: PropTypes.string
    }),
    searchable: PropTypes.bool,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    itemKeys: PropTypes.shape({
        name: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),
        id: PropTypes.string
    })
};

Dropdown.defaultProps = {
    open: false,
    prefix: undefined,
    suffix: undefined,
    options: [],
    selected: [],
    sortFn: undefined,
    filterFn: undefined,
    maxSelected: 1,
    clear: <FontAwesomeIcon icon={faTimes} />,
    handle: ({ state }) => <FontAwesomeIcon icon={state.open ? faCaretUp : faCaretDown} />,
    text: {
        noMatches: 'Nothing matched the search term',
        noneSelected: 'None',
        searchPlaceholder: 'Search'
    },
    searchable: true,
    disabled: false,
    tabIndex: undefined,
    itemKeys: undefined
};

export default function Dropdown(props) {
    const dropdownRef = useRef();
    const searchRef = useRef();

    const [state, dispatch] = useReducer(
        reducer,
        initialState({
            open: props.open,
            selected: props.selected
        })
    );

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

    // Corrects selected items to its is always consistent with the maxSelected.
    useEffect(() => {
        if (props.maxSelected > 0 && state.selected.length > props.maxSelected) {
            dispatch({
                type: 'setSelected',
                selected: state.selected.splice(0, props.maxSelected)
            });
        }
    }, [props.maxSelected, state.selected]);

    // Removes search term if the box becomes unsearchable.
    useEffect(() => {
        if (!props.searchable) {
            dispatch({ type: 'clearSearch' });
        }
    }, [props.searchable]);

    useEffect(() => {
        dispatch({ type: 'setSelected', selected: props.selected });
    }, [props.selected]);

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
        isSelected: item => state.selectedSet.has(item),
        numSelected: () => state.selected.length,
        selectOption: item => {
            let newSelected;
            let open = state.open;
            let maxSelected = props.maxSelected;

            if (maxSelected === 1) {
                newSelected = [item];
                open = false;
            } else {
                if (methods.isSelected(item)) {
                    // Deselect item (always possible).
                    newSelected = [...state.selected.filter(i => item !== i)];
                } else if (maxSelected === 0 || state.selected.length < maxSelected) {
                    // We have space to add to the selection.
                    newSelected = [
                        ...state.selected,
                        item
                    ];
                } else {
                    // How do we show that you have reached the selection limit???
                    return false;
                }
            }

            dispatch({ type: 'setSelected', selected: newSelected });
            if (open === false) {
                dispatch({ type: 'close' });
            }

            // Return focus to search.
            searchRef.current && searchRef.current.focus();
            // searchRef.current.scrollIntoView();

            return true;
        },
        clearOption: item => {
            dispatch({ type: 'setSelected', selected: [...state.selected.filter(i => item !== i)] });
        },
        clearAll: () => {
            dispatch({ type: 'clearSelected' });
        },
        search: searchTerm => {
            dispatch({ type: 'setSearchTerm', searchTerm });
        },
        canClick: item => {
            return (
                methods.isSelected(item) ||
                props.maxSelected <= 1 ||
                state.selected.length < props.maxSelected
            );
        },
        itemId: item => {
            return props.itemKeys && props.itemKeys.id && item[props.itemKeys.id];
        },
        itemName: item => {
            return (
                !props.itemKeys || !props.itemKeys.name
                    ? item
                    : typeof props.itemKeys.name === 'function'
                        ? props.itemKeys.name(item)
                        : item[props.itemKeys.name]
            );
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
            className={classNames(
                'dropdown',
                props.disabled && 'disabled'
            )}
            disabled={props.disabled}
            tabIndex={props.disabled ? -1 : props.tabIndex}
            onClick={
                !props.disabled
                    ? event => {
                        if (!state.open) {
                            methods.suppressEvent(event);
                            methods.openDropdown();
                        }
                    }
                    : undefined
            }
        >
            <SelectionContainer {...renderProps} />
            <ListContainer {...renderProps} />
        </div>
    );
}
