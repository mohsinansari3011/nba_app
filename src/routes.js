import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Home from './component/Home/home';
import Layout from './component/hoc/Layout/layout';

import NewArticles from './component/Articles/News/Post/index';
import VideosArticles from './component/Articles/Videos/Video/index';

import NewsMain from './component/Articles/News/Main/index';
import VideosMain from './component/Articles/Videos/Main/index';

import SignIn from './component/Signin/signin'
import Dashboard from './component/Dashboard/dashboard'


import PrivateRoute from './component/AuthRoutes/privateRoutes';
import PublicRoute from './component/AuthRoutes/publicRoutes';

class routes extends Component {
    render() {
        //console.log(this.props)
        return (
            <div>
                <Layout user={this.props.user}>
                    <Switch>
                        <PublicRoute {...this.props} restricted={false} path = "/" exact component = {Home}/> 
                        <PublicRoute {...this.props} restricted={false} path = "/news/" exact component = {NewsMain}/> 
                         <PublicRoute {...this.props} restricted={false} path = "/videos/" exact component = {VideosMain}/> 
                        <PublicRoute {...this.props} restricted={false} path = "/articles/:id" exact component = {NewArticles}/> 
                        <PublicRoute {...this.props} restricted={false} path = "/videos/:id" exact component = {VideosArticles}/> 
                        <PublicRoute {...this.props} restricted={true} path = "/sign-in/" exact component = {SignIn}/> 
                        <PrivateRoute {...this.props} path = "/dashboard/" exact component = {Dashboard}/> 
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default routes;