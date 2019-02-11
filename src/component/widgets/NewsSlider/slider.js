import React, { Component } from 'react';
import SliderTempelates from '../NewsSlider/slider_templates'
import { firebaseArticles , firebaselooper } from '../../../fireabase';

//import axios from 'axios';
// import { BaseURL } from '../../../config';



class NewsSlider extends Component {

state = {
    news:[]
}


componentWillMount(){

    firebaseArticles.limitToFirst(3).once('value')
    .then((snapshot)=>{
        const news = firebaselooper(snapshot);
       this.setState({
            news
        })
    })

    // axios.get(`${BaseURL}/articles?_start=${this.props.start}&_end=${this.props.end}`)
    // .then(Response =>{
    //    this.setState({
    //        news: Response.data
    //    })
    // } )
}

    render() {

        
        return (
          
            <SliderTempelates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
        );
    }
}

export default NewsSlider;