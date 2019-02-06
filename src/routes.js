import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './component/Home/home'
import Layout from './component/hoc/Layout/layout'

class routes extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path = "/" exact component = {Home}/> 
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default routes;