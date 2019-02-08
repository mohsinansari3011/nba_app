import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './component/Home/home'
import Layout from './component/hoc/Layout/layout'

import NewArticles from './component/Articles/News/Post/index'

class routes extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path = "/" exact component = {Home}/> 
                        <Route path = "/articles/:id" exact component = {NewArticles}/> 
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default routes;