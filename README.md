# simple-component-library

## Installation

```
npm install react-cool-dropdown
```

## TODO List:
- Item rendering override;
- Toolbars with buttons to control selection - selectAll, clearAll, invertSelection etc.;
- Adding items (to selection);
- Could we make it so that it only registers for the click outside IFF the dropdown is open???
- AdditionalProps that are available to custom renderers;
- Support for keyboard control;
- Up/down arrows to select item;
- Support for tabbing focus to prev and next controls;
- Backspace to delete the last selected item (assuming search term is empty);
- Typing in the search box and pressing `<Enter>` when you get a single response left should select it;
- aria-label.
- Keep Open option?

### Done
- ~~BUG: Should be able to scroll left and right along a multi-select list of selections when disabled;~~
- ~~Optimise 'isSelected' with lookup of id;~~
- ~~Variable fields;~~
- ~~Support for disabling the control (and removing from tabIndex?);~~
- ~~Remove from list when selected;~~
- ~~Add to the top of the list when selected (show the selected list at the top);~~
- ~~Click outside to close;~~
- ~~Click on the entire thing to open (initially);~~
- ~~Placeholder for multi select with nothing;~~
- ~~Toolbars with the ability to render statistics;~~
- ~~Limit the number of selected items.~~
- ~~Refactor to break into sub components for easier maintenance;~~
- ~~Disable searchable.~~

## Custom Functions
Any custom functions that are defined to override the render/display behaviour of the control take a single argumnet `renderProps` which is an object containing the following keys:
```javaScript
{
    props,      // The props passed into the control.
    state,      // The current state of the control.
    methods     // Methods to update the state of the control.
};
```

## Props
| Name | Type(s) | Default | Description |
|-|-|-|-|
| `open` | `bool` | `false` | Whether the dropdown should start open (`true`) or closed (`false`). |
| `prefix` | `node|func` | `undefined` | What should be rendered before the selected value(s) and search term in the input box (optional). |
| `suffix` | `node|func` | `undefined` | What should be rendered after the selected values(s) and search term in the input box (optional). |
| `options` | `[object|string]` | `[]` | The array of options that are displayed in the dropdown. |
| `sortFn` | `func` | `undefined` | Function that takes `(item1, item2)` and returns `-1`, `0` or `1` based on the equality of the items (as would be passed to the regular JS `sort` function). |
| `filterFn` | `func` | `undefined` | Function that takes `(searchTerm, item)` and returns `true` or `false` based on whether the items matches the provided `searchTerm` string. |
| `maxSelected` | `number` | `1` | Determines the maximum number of items that can be selected in the dropdown. Specify `1` for a single select dropdown, `0` for a multi-select (with no limits) or a number `> 1` for a multi-select dropdown with a specific limit on the number of items that can be selected at once. The control manages and enforces this limit. |
| `clear` | `node|func` | Standard Clear Fn | What should be rendered (if anything) to allow the user to quickly clear the selection. If `undefined` then the button will not be available. _**NOTE:** The button is only available when there is a selection._
| `handle` | `node|func` | Standard Handle Fn | What should be rendered to allow the user to open and close the dropdown. If `undefined` then this functionality will not be available, but the user will still be able to open the dropdown by clicking the input and close it by clicking outside the control. |
| `searchable` | `bool` | `true` | Whether the dropdown is searchable (`true`) or not (`false`). |
| `tabIndex` | `number` | `undefined` | The tab index associated with the control when it is not disabled. |
| `text` | `object` | _see below_ | Default text strings used for the dropdown. |
| `text.noMatches` | `string` | `Nothing matched the search term` | String to display when no options match the typed search term. |
| `text.noneSelected` | `string` | `None` | String to display when no options are selected. |
| `text.searchPlaceholder` | `string` | `Search` | String to display as the placeholder in the search field when no search term has been entered. |
| `itemKeys` | `object` | _see below_ | An object that defines the keys used on the `props.options` object. Only needs to be defined if the `props.options` is an defined as `[object]`.
| `itemKeys.name` | `string|func` | `undefined` | The property name on the `props.options` object to use for display. If defined as a function then it is called with `(item)` whenever the item needs to be displayed - it should generally just return a `string` because it is called for the list and selection contexts. |
| `itemKeys.id` | `string` | `undefined` | The property name on the `props.options` that can act as a unique key for the object. |

## State
| Name | Type | Description |
|-|-|-|
| `open` | `bool` | The current state of the dropdown, open (`true`) or closed (`false`). |
| `filteredOptions` | `[object]` | The current sorted, filtered array of options. |
| `searchTerm` | `string` | The current value of the search box as typed by the user. |
| `selected` | `[object|string]` | The array of objects currently selected (observing the limit indicated by `props.maxSelected`). |
| `selectedSet` `[object|string`] | A set of object currently selected - to enable faster lookups than pure linear searches. |
| `searchRef` | `ref` | React hook references for the search input box (allows focus to be set on the search input by other parts of the control). |

## Methods
| Name | Arguments | Description |
|-|-|-|
| `toggleDropdown` | _none_ | Toggles the current state of the dropdown (if open closes, if closed opens). |
| `closeDropdown` | _none_ | Closes the dropdown if currently open, otherwise has no effect. |
| `openDropdown` | _none_ | Opens the dropdown if currently closed, otherwise has no effect. |
| `suppressEvent` | `event` | Suppresses all actions and bubbling for the specified `event`. |
| `isSelected` | `item` | Determines if the specific `item` is currently selected (`true`) or not (`false`). |
| `numSelected` | _none_ | Returns the number of items currently selected. |
| `selectOption` | `item` | Adds the specified `item` to the `state.selected` array (if possible). Returns `true` is the addition was successful or `false` if it was not (due to any `props.maxSelected` limits). |
| `clearOption` | `item` | Removes the sepcified `item` from the `state.selected` array (always succeeds even if `item` was not selected in the first place). |
| `clearAll` | _none_ | Removes all items from the `state.selected` array. |
| `search` | `searchTerm` | Sets the current `state.searchTerm` to the specified `searchTerm` value. |
| `canClick` | `item` | Determines if the specified `item` can be added to the selection (determined by the value of `props.maxSelected`). Returns `true` if it can or `false` if it cannot. |
