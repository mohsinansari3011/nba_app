import React, { Component } from 'react';
import axios from 'axios';
import SliderTempelates from '../NewsSlider/slider_templates'
import { BaseURL } from '../../../config';



class NewsSlider extends Component {

state = {
    news:[]
}


componentWillMount(){

    axios.get(`${BaseURL}/articles?_start=${this.props.start}&_end=${this.props.end}`)
    .then(Response =>{
       this.setState({
           news: Response.data
       })
    } )
}

    render() {

        
        return (
          
            <SliderTempelates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
        );
    }
}

export default NewsSlider;