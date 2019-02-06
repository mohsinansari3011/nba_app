import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch , NavLink } from 'react-router-dom'


import Home from './component/home'
import Posts from './component/posts'
import Profile from './component/profile'
import PostItem from './component/post_item'
import Life from './component/lifecycles'
import Conditional from './component/conditional'
import User from './component/user'

const App = () =>{

    return (
        <BrowserRouter>
        <div>

            <header>
                    This is Header <br />
                    <NavLink to="/">Home</NavLink><br/>
                    <NavLink to="/posts" activeStyle={{color:'red'}} >Posts</NavLink><br />
                    <NavLink to={{
                        pathname:'/profile'
                    }}>Profile</NavLink><br />
                    <NavLink to="/life">Life</NavLink><br />
                    <NavLink to="/conditional">Conditional</NavLink><br />
                    <NavLink to="/user">User</NavLink><br />
                    <hr/>
            </header>
            <Switch>

                  
                    <Route path="/posts/:id/:username" component={PostItem} />
                    <Route path="/posts" component={Posts} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/life" component={Life} />
                    <Route path="/conditional" component={Conditional} />
                    <Route path="/user" component={User} />
                    <Route path="/" exact component={Home} />
                    <Route render={() => <h3>oops 404</h3>} />
            </Switch>
            </div>
        </BrowserRouter>
    )
}






ReactDOM.render(<App />, document.getElementById('root'));


