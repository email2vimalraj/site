---
title: 'React: useReducer hooks demo with nested select boxes'
date: '2019-03-02'
---

Today I got into a situation where I had to select the nested select box, that is, based on the value selected on the first select box, the values should be populated on the second select box.

This is the first time I'm trying hooks in react and wanted to experiment it. For this demo, I'm using [react-select](https://react-select.com/home) component.

The requirement is that the first select box will have list of countries. After I select one country, the second select box should be shown with the list of states of the selected country and the country select box should be disabled. Let's build it!

Consider I've the data as follows:

```javascript
const data = {
  countries: [
    {
      value: 'INDIA',
      label: 'India',
      states: [
        { value: 'TAMIL NADU', label: 'Tamil Nadu' },
        { value: 'KERALA', label: 'Kerala' },
        { value: 'ANDHRA PRADESH', label: 'Andhra Pradesh' }
      ]
    },
    {
      value: 'US',
      label: 'USA',
      states: [
        { value: 'CA', label: 'California' },
        { value: 'NY', label: 'New York' }
      ]
    }
  ]
}
```

And I'm setting up an initial state of my component:

```javascript
const initialState = {
  disableCountry: false,
  disableState: true,
  loadingState: false,
  statesToBeLoaded: []
}
```

Then I create the reducer function with list of actions that I trigger from my component. The actions are when I select a country and when I click on a clear button to clear my selections:

```javascript
const POPULATE_STATE = 'populateState'
const CLEAR = 'clear'
function reducer(state, action) {
  switch (action.type) {
    case POPULATE_STATE:
      return {
        ...state,
        disableCountry: true,
        disableState: false,
        loadingState: true,
        statesToBeLoaded: data.countries.find(
          country => country.value === action.country
        ).states
      }
    case CLEAR:
    default:
      return initialState
  }
}
```

Now I'm going to build my functional component which renders two select boxes:

```javascript
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <h1>useReducer demo</h1>

      <Select
        isDisabled={state.disableCountry}
        isLoading={state.loadingState}
        isClearable
        isSearchable
        placeholder="Select Country..."
        name="country"
        options={data.countries}
        onChange={e => dispatch({ type: POPULATE_STATE, country: e.value })}
      />

      <br />

      {!state.disableState && (
        <>
          <Select
            isDisabled={state.disableState}
            isLoading={false}
            isClearable
            isSearchable
            placeholder="Select State..."
            name="state"
            options={state.statesToBeLoaded}
          />

          <br />

          <button type="button" onClick={() => dispatch({ type: CLEAR })}>
            Clear
          </button>
        </>
      )}
    </div>
  )
}
```

Here `const [state, dispatch] = useReducer(reducer, initialState)` I'm using `useReducer` function from the react which gives me back the current state and the dispatch method to trigger actions.

So I dispatch `POPULATE_STATE` during `onChange` event in my first select box to load the states of the selected country, and I dispatch `CLEAR` even when user clicked on `Clear` button to reset the state of the functional component.

This worked perfectly! We can extend this example to load the data from the external apis during our dispatch event and leverage `loading` state to display the `progress` indicator.

### Code Sandbox demo

[![Edit useReducer demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/o9461q0z59?fontsize=14)
