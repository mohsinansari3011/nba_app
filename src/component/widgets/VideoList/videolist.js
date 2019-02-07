import React, { Component } from 'react';
import style from './videolist.css'
import axios from 'axios';
import { BaseURL } from '../../../config';
import Button from '../Buttons/button'


class videolist extends Component {

    state = {
        teams:[],
        videos:[],
        start : this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
    }



    render() {
        return (
            <div>
                videolist
            </div>
        );
    }
}

export default videolist;