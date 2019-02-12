import React, { Component } from 'react';
import SliderTempelates from '../NewsSlider/slider_templates'
import { firebase, firebaseArticles , firebaselooper } from '../../../fireabase';
import { resolve } from 'url';

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
      
    //   news.forEach((item,i) =>{
    //       firebase.storage().ref('images').child(item.image).getDownloadURL().then( url =>{
    //           news[i].image = url;
    //           this.setState({
    //               news
    //           })
    //       })
    //   })
      

        const asyncFucntion = (item,i,cb) =>{
             firebase.storage().ref('images').child(item.image).getDownloadURL().then(url => {
                 news[i].image = url;
                cb();
             })
        }


      let request = news.map((item,i) =>{
          return new Promise((resolve) =>{
              asyncFucntion(item,i,resolve)
          })
      })

      Promise.all(request).then(()=>{
            this.setState({
                news
            })
      })

        // this.setState({
        //     news
        // })
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