import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mainpage from './components/mainpage';
import FormData from './components/formdata';
import Page from './components/dataMgmt';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Page />, document.getElementById('root'));
registerServiceWorker();
