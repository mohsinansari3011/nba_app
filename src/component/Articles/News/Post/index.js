import React, { Component } from 'react';
// import axios from 'axios';
// import { BaseURL } from '../../../../config';
import style from '../../articles.css'
import Header from './header';
import Body from './body';
import { db , firebaseTeams , firebaselooper} from '../../../../fireabase';


class NewsArticle extends Component {

state = {
    article:[],
    team:[],

}


componentWillMount(){


        db.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();
            firebaseTeams.orderByChild("teamId").equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaselooper(snapshot);
                           this.setState({
                                article,
                                team
                           })
            })
        })
    // axios.get(`${BaseURL}/articles?id=${this.props.match.params.id}`)
    // .then(response =>{
    //     let article = response.data[0];
    //     axios.get(`${BaseURL}/teams?id=${article.team}`)
    //     .then(response => {
    //        this.setState({
    //             article,
    //             team:response.data
    //        })
    //     })
       
    // })
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