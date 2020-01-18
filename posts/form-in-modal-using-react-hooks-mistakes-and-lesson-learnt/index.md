---
title: Form in Modal using React hooks - mistakes and lesson learnt
date: 2019-04-08
---

Recently, I’ve stumbled upon a problem while building a **Form** in the **Modal** box. I would like to share that experience and believe it might help.

## Modal and Portals

I wanted to create a modal which can show some content or the form. The best way to create a modal in React is to use [Portal](https://reactjs.org/docs/portals.html). Because, the modal should always be a individual component outside the DOM hierarchy. The Portal let you do this. Kindly read through the react’s documentation to know more about the Portal and the benefits. Additionally, this [post](https://www.nearform.com/blog/exploring-react-portals/) might help you to understand better.

So, we know what is Portal! Let’s build our `Modal` component and render as a `Portal`. I’m using [create-react-app](https://facebook.github.io/create-react-app/) CLI tool to generate my react project. Before creating the portal, let’s make sure our `./public/index.html` has the outer DOM hierarchy.

Before:

```
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
</body>
```

After:

```
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```

I’ve added another `div` with the value of id attribute as `modal-root`. That is where we render all our modals.

Let’s create our `Modal` component with `Portal` support. I’ve created this under `components/modal/index.js`

```
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { StyledModal } from "./style";

// Creates a portal outside the DOM hierarchy
function Portal({ children }) {
  const modalRoot = document.getElementById("modal-root"); // A div with id=modal-root in the index.html
  const element = document.createElement("div"); // Create a div element which will be mounted within modal-root

  // useEffect bible: https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    modalRoot.appendChild(element);

    // cleanup method to remove the appended child
    return function cleanup() {
      modalRoot.removeChild(element);
    };
  });

  return createPortal(children, element);
}

// A modal component which will be used by other components / pages
function Modal({ children, toggle, open }) {
  return (
    <Portal>
      {open && (
        <StyledModal.ModalWrapper onClick={toggle}>
          <StyledModal.ModalBody onClick={event => event.stopPropagation()}>
            <StyledModal.CloseButton onClick={toggle}>
              &times;
            </StyledModal.CloseButton>
            {children}
          </StyledModal.ModalBody>
        </StyledModal.ModalWrapper>
      )}
    </Portal>
  );
}

export default Modal;
```

Here, the `Portal` method creates the portal and uses the `useEffect` hook to append the `div` element to the `modal-root` element and removes while `unmounting`. Here is the problem I faced, but wait till we uncover the issue.

The `StyledModal` is the styled component and the code is below (created under `/components/modal/style.js`):

```
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
`;

const CloseButton = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const StyledModal = {
  ModalWrapper,
  ModalBody,
  CloseButton
};
```

If you notice our `Modal` component, there are 3 props:

- open: A boolean prop to decide whether to show the modal or not.
- toggle: A method prop to toggle `open` from `true` to `false` or vice-versa.
- children: A children component to render within modal. This is usually a modal content.

To toggle the `Modal's` state, let’s create a new custom hook and call it as `useToggle`. I’m creating `useToggle.js` in the `src` directory:

```
import { useState, useCallback } from "react";

// Toggles between true or false
function useToggle(initialValue = false) {
  const [toggle, setToggle] = useState(initialValue);

  return [toggle, useCallback(() => setToggle(status => !status), [])];
}

export default useToggle;
```

In this user can toggle between `true` or `false`. This will be used in our `App` component.

Let’s rewrite our `App` component in the `index.js`:

```
function App() {
  const [open, setOpen] = useToggle(false);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button type="button" onClick={() => setOpen()}>
        Open Modal
      </button>

      {open && (
        <Modal open={open} toggle={setOpen}>
          <h1>Hello Modal</h1>
        </Modal>
      )}
    </div>
  );
}
```

The `useToggle` hook gives the state of `toggle` through a parameter called `open` and the `setOpen` let you to toggle the value of the `open`. The rest of the code is self-explanatory.

When you run, you don’t see any problem. Great! We’ve built the Modal which shows the heading. Let’s extend it and add a form to our modal component with one input box.

I’ve modified my `App` component with an `input` element under the `form`.

```
function App() {
  const [open, setOpen] = useToggle(false);
  const [username, setUsername] = useState("");

  const onChangeUsername = e => setUsername(e.target.value);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button type="button" onClick={() => setOpen()}>
        Open Modal
      </button>

      {open && (
        <Modal open={open} toggle={setOpen}>
          <h1>Hello Modal</h1>

          <form onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => onChangeUsername(e)}
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
```

Now run the code and open up the modal. Try to enter more than one character in the displayed input box. Gosh, it is broken!!! For every character, the modal re-renders. Did you see that?

Okay, how to fix that now? I’ve spent ample of time to understand the issue. With some help of reddit users and `useEffect` [bible](https://overreacted.io/a-complete-guide-to-useeffect/), I’ve found an issue in our `Portal` component.

In our `Portal` component, we’ve to put the `div` element into the state and add `modal-root` and `div` as dependencies for the `useEffect`. So that it doesn’t re-render. Let’s do this:

```
function Portal({ children }) {
  const modalRoot = document.getElementById("modal-root"); // A div with id=modal-root in the index.html
  const [element] = useState(document.createElement("div")); // Create a div element which will be mounted within modal-root

  // useEffect bible: https://overreacted.io/a-complete-guide-to-useeffect/
  useEffect(() => {
    modalRoot.appendChild(element);

    // cleanup method to remove the appended child
    return function cleanup() {
      modalRoot.removeChild(element);
    };
  }, [modalRoot, element]);

  return createPortal(children, element);
}
```

Now run, and try the same which caused the problem. Voila! now it worked.

So always to remember, make sure `useEffect` has the dependencies set properly to avoid re-rendering.

The sample code sandbox can be found here:

[![Edit Modal-Portal-Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/1z2p4wqyjq?fontsize=14)

I hope my experience could help someone. If you like this article, kindly hit the **Like** button and **Share**.

_Update_: After a [reddit](https://www.reddit.com/r/reactjs/comments/baujx4/form_in_modal_using_react_hooks_mistakes_and/) user pointed out, we can simplify the `Portal` without even the hooks.

```javascript
function Portal({ children }) {
  const modalRoot = document.getElementById('modal-root') // A div with id=modal-root in the index.html

  return createPortal(<div>{children}</div>, element)
}
```

However, this post still remains valid which shows that user tend to do mistakes while creating `useEffect` and how to avoid them by managing dependencies for the side effects.
