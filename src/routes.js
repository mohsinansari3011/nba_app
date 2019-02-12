import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './component/Home/home';
import Layout from './component/hoc/Layout/layout';

import NewArticles from './component/Articles/News/Post/index';
import VideosArticles from './component/Articles/Videos/Video/index';

import NewsMain from './component/Articles/News/Main/index';
import VideosMain from './component/Articles/Videos/Main/index';

import SignIn from './component/Signin/signin'
import Dashboard from './component/Dashboard/dashboard'


import PrivateRoutes from './component/AuthRoutes/privateRoutes/';
import PublicRoutes from './component/AuthRoutes/publicRoutes/';

class routes extends Component {
    render() {
        //console.log(this.props)
        return (
            <div>
                <Layout user={this.props.user}>
                    <Switch>
                        <Route path = "/" exact component = {Home}/> 
                        <Route path = "/news/" exact component = {NewsMain}/> 
                         <Route path = "/videos/" exact component = {VideosMain}/> 
                        <Route path = "/articles/:id" exact component = {NewArticles}/> 
                        <Route path = "/videos/:id" exact component = {VideosArticles}/> 
                        <Route path = "/sign-in/" exact component = {SignIn}/> 
                        <Route path = "/dashboard/" exact component = {Dashboard}/> 
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default routes;