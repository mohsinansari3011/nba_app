import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter} from 'react-router-dom'
import { firebase } from './fireabase';

import Routes from './routes'

const App = (props) =>{

    return (
        <BrowserRouter>
            <Routes {...props} />
        </BrowserRouter>
    )
}




firebase.auth().onAuthStateChanged((user) =>{
ReactDOM.render(<App user={user} />, document.getElementById('root'));
})



serviceWorker.register();
