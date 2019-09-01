This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### Example 1

```js
const EVENTS1 = [
  {start: 30, end: 120}, 
  {start: 300, end: 330}, 
  {start: 290, end: 330}
]

renderDay(EVENTS1)
```
#### Result

<img src="/images/events%20example%201.png" width="400">


### Example 2

```js
const EVENTS1 = [
  { start: 30, end: 120 },
  { start: 110, end: 130 },
  { start: 120, end: 200 },
  { start: 290, end: 330 },
]

renderDay(EVENTS1)
```
#### Result

<img src="/images/events%20example%202.png" width="400">
