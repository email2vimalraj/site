---
title: 'React Hooks: Lift up / pass down state using useContext and useReducer'
date: '2019-03-13'
---

Long post alert!

I've ran into a situation where I had many child and sibling components trying to share the state between them. Earlier, I used `prop` to send a method to share the updated states between the components. At one point of time, the number of props kept increasing and I hated that.

Then came a `context` based approach to store the state in a global store and share it across. But even with the `context` API, you had to have a `render props` to consume the stored state from the global `context`. You will soon realise that your component becomes a nested, non-maintainable and haunting to look back.

Now this post talks about how we can leverage the latest React's `hooks` concepts to achieve the same with a cleaner code.

Let's first build the sample UI with some child & sibling components.

## Let's UI

Head on to the [CodeSandbox](https://codesandbox.io) to quickly experiment. Make sure that you create a `React` code sandbox.

Replace the `index.js` with the following:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

function App() {
  return (
    <div className="App">
      <h1>Lift up / Pass down state</h1>

      <UserList />
      <AddGenderToUser />
      <AddAgeToUser />
    </div>
  )
}

function UserList() {
  return (
    <ul>
      <li>
        <span>Vimalraj Selvam</span>
        <button type="button">Edit</button>
      </li>

      <li>
        <span>Bhuvaneswari Vimalraj</span>
        <button type="button">Edit</button>
      </li>
    </ul>
  )
}

function AddGenderToUser({ username }) {
  return (
    <div>
      <h2>Add gender to {username}</h2>
      <button type="button">Add Age</button>
    </div>
  )
}

function AddAgeToUser({ username }) {
  return (
    <div>
      <h2>Add Age to {username}</h2>
      <button type="button">Submit</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

Here I've 3 child components to parent `App` component: `UserList`, `AddGenderToUser` and `AddAgeToUser`.

This is very simple example. So don't think much about the usecase of this application.

I wanted to show the `AddGenderToUser` component only when the `Edit` button for a particular user is clicked and update the title of the of the component with selected username.

The same thing goes for `AddAgeToUser` component, upon clicking the `Add Age` button from the `AddGenderToUser` component.

First, let create a initial state of the application when no user is selected.

```js
const initialState = {
  username: null,
  gender: null,
  age: null
}
```

Then create our reducer method to perform different actions. The actions which I can think of are:

- Update the user
- Set the gender for the current user
- Set the age for the current user

Let's put this in a `reducer` function:

```js
const UPDATE_USER = 'UPDATE_USER'
const SET_GENDER = 'SET_GENDER'
const SET_AGE = 'SET_AGE'

function reducer(state, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        username: action.username,
        gender: null,
        age: null
      }
    case SET_GENDER:
      return {
        username: state.username,
        gender: action.gender,
        age: null
      }
    case SET_AGE:
      return {
        username: state.username,
        gender: state.gender,
        age: action.age
      }
    default:
      return initialState
  }
}
```

Our reducer method is very simple. It takes values from the `action` parameter and sets it to current state.

Now let's use this reducer function in our parent `App` component using `useReducer` hook from the react. So that we can consume the properties of reducer through the `context`.

Let's add the below line just before the `return` statement of `App` component.

```js
const [user, dispatch] = React.useReducer(reducer, initialState)
```

Here `user` is the current state and `dispatch` is the method through which we trigger various actions defined on the reducer. To do that, we have to pass the `dispatch` method to down the line and also if any updates happens at the `state` object, the parent / other children of parent should also be aware about.

To achieve the above objective, we have to leverage `context` API from react to store our state and dispatch.

Let's initialize the `context` with the following line. This line should be before your `App` function (it really doesn't matter).

```js
const MyContext = React.createContext(null)
```

I've initialized the context with null. We've to put our state and dispatch into the context. To do that, let's edit our `App` component by wrapping all the childrens with `context's` provider. The updated `App` component should look like below:

```jsx
<MyContext.Provider value={{ user, dispatch }}>
  <UserList />
  {user.username && <AddGenderToUser />}
  {user.gender && <AddAgeToUser />}
</MyContext.Provider>
```

Great, now we can access the `user` state and the corresponding `dispatch` method down the line. Also, I've added a conditional rendering of few child elements based on the `user` state properties `username` & `gender`.

Let's update our `UserList` component to trigger the `UPDATE_USER` action upon clicking on `Edit` button for a particular user. To do that, we've to get the `dispatch` method from the `context` using `useContext` hook from React.

The rewritten `UserList` component:

```jsx
function UserList() {
  const { dispatch } = useContext(MyContext)
  return (
    <ul>
      <li>
        <span>Vimalraj Selvam</span>
        <button
          type="button"
          onClick={() => dispatch({ type: UPDATE_USER, username: 'Vimalraj' })}
        >
          Edit
        </button>
      </li>

      {/* Removed for brevity */}
    </ul>
  )
}
```

We're dispatching `UPDATE_USER` action and sending the `username` along with to update the property of the state. Now when you click on the `Edit` button for a particular user, you can see the `AddGenderToUser` component appears. But we still don't see the username in the appeared component. Let's fix that!

```jsx
function AddGenderToUser() {
  const { user, dispatch } = useContext(MyContext)

  return (
    <div>
      <h2>Add gender to {user.username}</h2>
      <button
        type="button"
        onClick={() => dispatch({ type: SET_GENDER, gender: '??' })}
      >
        Add Age
      </button>
    </div>
  )
}
```

We're getting the current `user` state and `dispatch` method. We extract the `username` property to display in a title and trigger `SET_GENDER` action upon clicking on `Add Age` button.

You can repeat the same for the `AddAgeToUser` function as well.

The completed version is available in the code sandbox, please feel free to view here.

[![Edit Lift up / pass down state](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pw5zlq8zj0?fontsize=14)

In the code sandbox, I've slightly updated the `App` component to show the details once the age is updated.

If this post helped you, please hit like and share.
