import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import GitCards from './GitCards';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<GitCards />, document.getElementById('root'));
registerServiceWorker();
