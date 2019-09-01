import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './Calendar';
import * as serviceWorker from './serviceWorker';

window.renderDay = (events) => {
    ReactDOM.render(<Calendar events={events}/>, document.getElementById('root'));
}

serviceWorker.unregister();
