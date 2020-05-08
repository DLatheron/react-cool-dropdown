import React, { useState } from "react";
import { Dropdown } from "../lib";
import styled from 'styled-components';
import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft, faTimes } from '@fortawesome/free-solid-svg-icons'

import './App.scss';

const fruits = require('./Fruits.json');
const objectOptions = fruits.map((fruit, index) => ({
    id: (index + 1),
    sortIndex: index,
    name: fruit
}));
const stringOptions = fruits;

const text = {
    noMatches: 'No fruits matched the search term',
    noneSelected: 'None',
    searchPlaceholder: 'Search...'
};

const examples = {
    singleSelectMoveToTop: {
        title: '',
        props:{
            options: objectOptions,
            sortFn: (e1, e2) => {
                return e1.sortIndex - e2.sortIndex;
            },
            filterFn: (searchTerm, item) => {
                const regExp = new RegExp(searchTerm, 'i');

                return regExp.test(item.id) || regExp.test(item.name);
            },
            maxSelected: 1,
            moveToTop: true,
            text
        }
    },
    multiSelectMoveToTop: {
        title: '',
        props: {
            options: objectOptions,
            sortFn: (e1, e2) => {
                return e1.sortIndex - e2.sortIndex;
            },
            filterFn: (searchTerm, item) => {
                const regExp = new RegExp(searchTerm, 'i');

                return regExp.test(item.id) || regExp.test(item.name);
            },
            footer: renderProps => `${renderProps.state.selected.length} item(s) selected`,
            maxSelected: 0,
            moveToTop: true,
            text
        }
    }
};

const Examples = styled.div`
`;

const Title = styled.h1`
`;

const Example = styled.div`
`;

const ExampleTitle = styled.h2`
`;

const Code = styled.pre`
`;

const Controls = styled.div`
    border: 1px solid gray;
    padding: 10px;
`;

const Checkbox = styled.div`
    margin: 5px 0;

    input {
        margin-right: 10px;
    }

    label {
        vertical-align: middle;
    }
`;

function generatePropsExampleCode(props) {
    function summariseValue(value, propertyName) {
        switch (typeof value) {
            case 'object':
                if (Array.isArray(value)) {
                    if (value.length === 0) {
                        return '[]';
                    } else {
                        return `[...${value.length} item(s)...]`
                    }
                } else {
                    return `{...object...}`;
                }

            case 'string':
                return `'${value}'`;

            case 'boolean':
                return value;

            case 'number':
                return value;

            case 'function':
                return `() => { ...custom function for ${propertyName}... }`;

            default:
                throw new Error(`Unknown value type: ${typeof value}`);
        }
    }

    function getLine(value, propertyName) {
        if (value === undefined || value === null) {
            return;
        }

        return `    ${propertyName}: ${summariseValue(value, propertyName)}`;
    }

    return [
        '{',
        _.filter(
            _.map(props, getLine),
            line => line !== undefined
        ).join(',\n'),
        '}'
    ].join('\n');
};

function App() {
    const [clear, setClear] = useState(false);
    const [prefix, setPrefix] = useState(false);
    const [suffix, setSuffix] = useState(false);
    const [header, setHeader] = useState(false);
    const [footer, setFooter] = useState(false);
    const [handle, setHandle] = useState(false);
    const [searchable, setSearchable] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [moveToTop, setMoveToTop] = useState(false);
    const [maxSelected, setMaxSelected] = useState(0);

    const overrides = {
        clear: clear ? () => <FontAwesomeIcon icon={faTimes} /> : null,
        prefix: prefix ? () => <FontAwesomeIcon icon={faCaretRight} /> : undefined,
        suffix: suffix ? () => <FontAwesomeIcon icon={faCaretLeft} /> : undefined,
        header: header ? 'Fruit' : undefined,
        footer: footer ? ({ state: { selected } }) => `${selected.length} item(s) selected` : undefined,
        handle: handle ? ({ state: { open } }) => <FontAwesomeIcon icon={open ? faCaretRight : faCaretLeft} /> : undefined,
        searchable,
        disabled,
        maxSelected,
        moveToTop
    };

    return (
        <Examples className='app'>
            <Title>Dropdown Examples</Title>
            {/* <Dropdown
                // prefix={<FontAwesomeIcon icon={faCaretRight} />}
                // suffix={<FontAwesomeIcon icon={faCaretLeft} />}
                clear={null}
                open={true}
                options={
                    fruits.map((fruit, index) => ({
                        id: (index + 1),
                        sortIndex: index,
                        name: fruit
                    }))
                }
                // header='This is a simple header'
                // footer='This is a simple footer'
                sortFn={(e1, e2) => {
                    return e1.sortIndex - e2.sortIndex;
                }}
                filterFn={(searchTerm, item) => {
                    const regExp = new RegExp(searchTerm, 'i');

                    return regExp.test(item.id) || regExp.test(item.name);
                }}
                maxSelected={1}
                noneOption={true}
            /> */}
            <Example>
                <ExampleTitle>With Option Objects</ExampleTitle>
                <Dropdown
                    {...examples.singleSelectMoveToTop.props}
                    {...overrides}
                    options={objectOptions}
                    itemKeys={{ id: 'id', name: 'name' }}
                    selected={[objectOptions[0], objectOptions[1], objectOptions[2], objectOptions[3]]}
                />
                <Code>{generatePropsExampleCode({...examples.singleSelectMoveToTop.props, ...overrides})}</Code>
            </Example>

            <Example>
                <ExampleTitle>With Option Strings</ExampleTitle>
                <Dropdown
                    {...examples.singleSelectMoveToTop.props}
                    {...overrides}
                    options={stringOptions}
                    selected={[stringOptions[0], stringOptions[1], stringOptions[2], stringOptions[3]]}
                />
                <Code>{generatePropsExampleCode({...examples.singleSelectMoveToTop.props, ...overrides})}</Code>
            </Example>

            {/* <Example>
                <ExampleTitle>{examples.multiSelectMoveToTop.title}</ExampleTitle>
                <Dropdown {...examples.multiSelectMoveToTop.props} />
                <Code>{generatePropsExampleCode(examples.multiSelectMoveToTop.props)}</Code>
            </Example> */}

            <Controls>
            {
                [
                    { id: 'clear', value: clear, type: 'checkbox', setValue: setClear, text: 'Clear Button' },
                    { id: 'prefix', value: prefix, type: 'checkbox', setValue: setPrefix, text: 'Prefix' },
                    { id: 'suffix', value: suffix, type: 'checkbox', setValue: setSuffix, text: 'Suffix' },
                    { id: 'header', value: header, type: 'checkbox', setValue: setHeader, text: 'Header' },
                    { id: 'footer', value: footer, type: 'checkbox', setValue: setFooter, text: 'Footer' },
                    { id: 'handle', value: handle, type: 'checkbox', setValue: setHandle, text: 'Handle' },
                    { id: 'searchable', value: searchable, type: 'checkbox', setValue: setSearchable, text: 'Searchable' },
                    { id: 'disabled', value: disabled, type: 'checkbox', setValue: setDisabled, text: 'Disabled' },
                    { id: 'moveToTop', value: moveToTop, type: 'checkbox', setValue: setMoveToTop, text: 'Move selected item to top of list' },
                    { id: 'maxSelected', value: maxSelected, type: 'number', min: 0, setValue: setMaxSelected, text: 'Maximum number of selected items' }
                ]
                    .map(({ id, value, type, setValue, min, max, text }) => {
                        return (
                            <Checkbox key={id}>
                                <input
                                    id={id}
                                    type={type}
                                    value={value}
                                    min={min}
                                    max={max}
                                    checked={type === 'checkbox' ? value : undefined}
                                    onChange={e => {
                                        if (type === 'checkbox') {
                                            setValue(!value);
                                        } else if (type === 'number') {
                                            setValue(parseInt(e.target.value));
                                        } else {
                                            throw new Error('Unsupported type');
                                        }
                                    }}
                                />
                                <label htmlFor={id}>{text}</label>
                            </Checkbox>
                        );
                    })
            }
            </Controls>
        </Examples>
    );
}

export default App;
