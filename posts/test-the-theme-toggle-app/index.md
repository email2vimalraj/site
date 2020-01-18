---
title: 'Test the Theme toggle app using react-testing-library'
date: '2019-05-29'
---

In my previous [article](http://www.vimalselvam.com/2019/05/28/toggle-theme-using-react-hooks/) we've built an app with Theme toggling capability. In this article, let's test that feature.

I'll be using [react-testing-library](https://github.com/testing-library/react-testing-library) and [jest-dom](https://github.com/testing-library/jest-dom) as a partner library for the `react-testing-library` for leveraging custom DOM element matchers for Jest.

Let's install both the libraries as dev dependencies.

```bash
npm install -D react-testing-library jest-dom
```

Since we used `create-react-app`, there is a nice article to get started with running tests in their doc site [here](https://facebook.github.io/create-react-app/docs/running-tests). I highly recommend my readers to read through the doc once.

As mentioned [here](https://facebook.github.io/create-react-app/docs/running-tests#option-2-react-testing-library), let's create a `setupTests.js` under the `src` directory.

```js
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
```

- The 1st import ensures the rendered component by `react-testing-library` is removed after every test ran.
- The 2nd import let's us use the `jest-dom`'s custom matchers mainly we use it for assertion.

Before writing our tests, let's add an attribute `data-testid` in the `header` and `button` component in our `App.js` component as like follows:

```html
<header className="App-header" style={{ backgroundColor: theme.backgroundColor, color: theme.color }} data-testid="header">
  <button type="button" onClick={toggle} style={{ backgroundColor: theme.backgroundColor, color: theme.color, outline: 'none' data-testid="toggle-theme-btn" >
    ...
  </button>
</header>
```

We'll be using the `data-testid` attribute to find the elements in our tests.

Now let's create a new test. Go and delete everything on `App.test.js` and have the following test:

```js
import React from 'react'
import { render } from 'react-testing-library'
import App from './App'

test('renders with light mode default', () => {
  const { getByTestId } = render(<App />)
  expect(getByTestId('toggle-theme-btn')).toBeInTheDocument()
  expect(getByTestId('header')).toHaveStyle('background-color: white')
})
```

In our 1st line, we render our `App` component and then we assert whether there is a `Toggle theme` button and the default `background color` is `white` using the respective `data-testid`s.

Let's run the test and see whether the run is success.

```bash
npm run test
```

Hoorah!!! The test ran successfully!

Now, let's add another test to validate whether clicking on the toggle button changes the background color.

```js
test('toggles the theme', () => {
  const { getByTestId } = render(<App />)
  const toggleBtn = getByTestId('toggle-theme-btn')
  fireEvent.click(toggleBtn)
  expect(getByTestId('header')).toHaveStyle('background-color: black')
  fireEvent.click(toggleBtn)
  expect(getByTestId('header')).toHaveStyle('background-color: white')
})
```

Make sure you import `fireEvent` from the `react-testing-library`.

Let's see the run result. The newly added test failed 😟. Why?

```bash
✕ toggles the theme (29ms)

  ● toggles the theme

    expect(element).toHaveStyle()

    - Expected

    - background-color: black;
    + background-color: white;

      13 |   const toggleBtn = getByTestId('toggle-theme-btn')
      14 |   fireEvent.click(toggleBtn)
    > 15 |   expect(getByTestId('header')).toHaveStyle('background-color: black')
         |                                 ^
      16 |   fireEvent.click(toggleBtn)
      17 |   expect(getByTestId('header')).toHaveStyle('background-color: white')
      18 | })

      at Object.toHaveStyle (src/App.test.js:15:33)
```

The execution stack trace says that the `background-color` is still `white`. That means after firing a `click` event, the `localStorage`'s `setItem` method is not properly triggered.

To make this work, we should mock our `localStorage` since the test doesn't execute on the real browser and don't have the `Storage`. Now open up your `setupTests.js` and append the following lines:

```js
let store = {}

// Mock the `localStorage.getItem` method to return the value stored in the given key
jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
  return store[key]
})

// Mock the `localStorage.setItem` method to insert a given value into the given key
jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
  return (store[key] = value + '')
})

// Mock the `localStorage.clear` method to clear the `store`
jest.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
  store = {}
})
```

Now let's run our test and see the results. Still failing for the same reason. Let's add some debug points with our famous `console.log` statements in our `theme-context.js`.

I have added the following statement in our `toggle` method within our `ThemeProvider` function:

```js
console.log('>>> clicked')
```

Let's see the run results and notice whether that statement is printed. Surprisingly, not!

The reason is our `App` component in the test is not wrapped with `ThemeProvider`. We should wrap it. Let's do that.

Once you wrapped, your test must pass and the added `console.log` statement should print twice!!!

Great work. But do we need to wrap the `App` component with `ThemeProvider` in every single test. I heard you saying that's a pain. But we have a solution for that too.

So I've asked this question to [Kent](https://twitter.com/kentcdodds) in [twitter here](https://twitter.com/email2vimalraj/status/1131496659685220352). And I got immediate responses.

> Yep. I recommend wrapping, but moving works too. Learn more about wrapping without the pain here: https://testing-library.com/docs/react-testing-library/setup#custom-render

So as per the above, let's create a test utility file to define our own render method. Create a file called `src/test-util.js` and add the following:

```js
import React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider } from './theme-context'

const AllMyProviders = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

const MyCustomRender = (component, options) =>
  render(component, { wrapper: AllMyProviders, ...options })

// re-export everything from the `react-testing-library`
export * from 'react-testing-library'

// export our custom render method
export { MyCustomRender as render }
```

Let's go to our test and make few changes:

Replace

```js
import { render, fireEvent } from 'react-testing-library'
```

with

```js
import { render, fireEvent } from './test-utils'
```

And then, remove the `ThemeProvider` wrapping for the `App` component in all the tests. Now execute your test and see.

The tests should run fine. That's it for today. If you found this post useful, please hit like and share it.
