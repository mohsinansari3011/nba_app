import React, { Component } from 'react';
import './layout.css'
class layout extends Component {
    render() {
        return (
            <div>
                header
                {this.props.children}
                footer
            </div>
        );
    }
}

export default layout;