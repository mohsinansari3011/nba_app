import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './component/Home/home';
import Layout from './component/hoc/Layout/layout';

import NewArticles from './component/Articles/News/Post/index';
import VideosArticles from './component/Articles/Videos/Video/index';

import NewsMain from './component/Articles/News/Main/index';
import VideosMain from './component/Articles/Videos/Main/index';

import SignIn from './component/Signin/signin'

class routes extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path = "/" exact component = {Home}/> 
                        <Route path = "/news/" exact component = {NewsMain}/> 
                         <Route path = "/videos/" exact component = {VideosMain}/> 
                        <Route path = "/articles/:id" exact component = {NewArticles}/> 
                        <Route path = "/videos/:id" exact component = {VideosArticles}/> 
                        <Route path = "/sign-in/" exact component = {SignIn}/> 
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default routes;