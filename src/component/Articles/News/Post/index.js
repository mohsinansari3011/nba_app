import React, { Component } from 'react';
import axios from 'axios';
import { BaseURL } from '../../../../config';
import style from '../../articles.css'
import Header from './header';
import Body from './body';



class NewsArticle extends Component {

state = {
    article:[],
    team:[],

}


componentWillMount(){
    axios.get(`${BaseURL}/articles?id=${this.props.match.params.id}`)
    .then(response =>{
        let article = response.data[0];
        axios.get(`${BaseURL}/teams?id=${article.team}`)
        .then(response => {
           this.setState({
                article,
                team:response.data
           })
        })
       
    })
}

    render() {
       //const { article,team} = this.state;
       const article = this.state.article;
       const team = this.state.team; 
        return (

            //team ? 'true' :'false'
            <div className={style.articleWrapper}>
                <Header teamData = {team[0]} date={article.date} author = {article.author}/>
                 < Body article={article} />
            </div>
        );
    }
}

export default NewsArticle;