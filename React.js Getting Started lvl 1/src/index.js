import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'bootstrap/dist/css/bootstrap.css';

// import App from './App';
// import GitCards from './GitCards';
import PlayNine from './PlayNine';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<GitCards />, document.getElementById('root'));
ReactDOM.render(<PlayNine />, document.getElementById('root'));
registerServiceWorker();
