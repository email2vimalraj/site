---
title: 'Toggle theme using React Hooks'
date: 2019-05-28
---

I was trying to implement the Dark mode to one of the application which I was working. Most of the examples available in Internet uses either `styled-components` or any other `css-in-js` concepts. The application which I'm working on doesn't have the `css-in-js` yet. So I want to keep it very simple. Hence, the very first thing that came up is to use React's [Context](https://reactjs.org/docs/context.html) API. Why Context? As per the react documentation:

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

Yes, the definition is very self explanatory. We don't have to pass the props to every component and down the component tree. Think of this maintains a global state.

To create a context object, we should use React's `createContext` method and pass the default value to it (i.e., initial state).

```javascript
const ThemeContext = React.createContext(initialState)
```

The `ThemeContext` object contains a `ThemeContext.Provider` component, so that the children component can consume the changes / state.

We've pretty much covered the basic of what we need to do further. Let's build the application which can toggle between light and dark mode. Please note that once I toggle to a particular mode, next time I visit the application, it should retain the same mode. That is, if I toggled to Light mode, next time I visit, it should display the application in Light mode only. So we'll be using the `localStorage` to persist the theme selected.

Create a react app:

```bash
create-react-app my-app
cd my-app
npm start
```

Open it in your favorite editor.

Create a file called `theme-context.js` under `src` directory.

```javascript
const themes = {
  dark: {
    backgroundColor: 'black',
    color: 'white'
  },
  light: {
    backgroundColor: 'white',
    color: 'black'
  }
}
```

I'm keeping it simple. I'm maintaining two theme types `dark` and `light` with some simple background and foreground colors respectively. So if I toggled to `dark` mode, then I should my page's backgound color is changed to `black` and foreground color to `white` and if light, the other way around.

Next, let me put in my initial state to put it in `createContext`.

```javascript
const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {}
}
const ThemeContext = React.createContext(initialState)
```

Then, let's create a method which wraps all children with `ThemeContext.Provider` component and export this method and the actual `ThemeContext` object that we created just before.

```javascript
function ThemeProvider({ children }) {
  const [dark, setDark] = React.useState(false) // Default theme is light

  // On mount, read the preferred theme from the persistence
  React.useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true'
    setDark(isDark)
  }, [dark])

  // To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark
    localStorage.setItem('dark', JSON.stringify(isDark))
    setDark(isDark)
  }

  // Filter the styles based on the theme selected
  const theme = dark ? themes.dark : themes.light

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
```

So the final `theme-context.js` look like this:

```javascript
import React from 'react'

const themes = {
  dark: {
    backgroundColor: 'black',
    color: 'white'
  },
  light: {
    backgroundColor: 'white',
    color: 'black'
  }
}

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {}
}
const ThemeContext = React.createContext(initialState)

function ThemeProvider({ children }) {
  const [dark, setDark] = React.useState(false) // Default theme is light

  // On mount, read the preferred theme from the persistence
  React.useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true'
    setDark(isDark)
  }, [dark])

  // To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark
    localStorage.setItem('dark', JSON.stringify(isDark))
    setDark(isDark)
  }

  const theme = dark ? themes.dark : themes.light

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
```

Open `index.js` and wrap the `App` component with our `ThemeProvider`. So that the theme state can be shared with all the children available within `App` component.

The modified `index.js` look like:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from './theme-context'

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
```

Let's go to `App.js` and add the following before the `return` statement:

```javascript
const { theme, toggle, dark } = React.useContext(ThemeContext)
```

The `useContext` is the React's Hook api which is equivalent to `ThemeContext.Consumer` component. Read more about it [here](https://reactjs.org/docs/hooks-reference.html#usecontext).

Then add a button before the `<img>` tag to toggle the theme:

```html
<button
  type="button"
  onClick={toggle}
  style={{
    backgroundColor: theme.backgroundColor,
    color: theme.color,
    outline: 'none'
  }}
>
  Toggle to {!dark ? 'Dark' : 'Light'} theme
</button>
```

Now in the `header` tag, add the following attribute:

```javascript
style={{ backgroundColor: theme.backgroundColor, color: theme.color }}

```

Take a look at your application (mostly it should be running at http://localhost:3000). You can see the background color changed to `white` and the foreground color in `black`.

Click on the button to toggle between `Dark` and `Light` mode. You can close and re-open the tab or open a new tab of the same application, the theme mode is persisted.

The entire code of `App.js`:

```javascript
import React from 'react'
import logo from './logo.svg'
import './App.css'
import { ThemeContext } from './theme-context'

function App() {
  const { theme, toggle, dark } = React.useContext(ThemeContext)

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        <button
          type="button"
          onClick={toggle}
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
            outline: 'none'
          }}
        >
          Toggle to {!dark ? 'Dark' : 'Light'} theme
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
```

Demo:

[![Edit theme-context-hook-api](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/themecontexthookapi-uumsb?autoresize=1&fontsize=14&module=%2Fsrc%2FApp.js&view=preview)
