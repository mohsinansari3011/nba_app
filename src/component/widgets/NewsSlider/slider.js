import React, { Component } from 'react';
import axios from 'axios';
import SliderTempelates from '../NewsSlider/slider_templates'

class NewsSlider extends Component {

state = {
    news:[]
}


componentWillMount(){

    axios.get(`http://localhost:3004/articles?_start=0&_end=3`)
    .then(Response =>{
       this.setState({
           news: Response.data
       })
    } )
}

    render() {

        
        return (
          
            <SliderTempelates data={this.state.news} type="featured" />
        );
    }
}

export default NewsSlider;