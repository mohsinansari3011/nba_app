import React, { Component } from 'react';
// import axios from 'axios';
// import { BaseURL } from '../../../../config';
import style from '../../articles.css'
import Header from './header';
import Body from './body';
import { db ,firebase, firebaseTeams , firebaselooper} from '../../../../fireabase';


class NewsArticle extends Component {

state = {
    article:[],
    team:[],
    imageURL:'',

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

                           this.getImageURL(article.image);
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


getImageURL = (filename) =>{

    firebase.storage().ref('images').child(filename).getDownloadURL().then( url =>{
        this.setState({
            imageURL:url
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
                
                <div className={style.articleBody}>
            <h1>{article.title}</h1>
            <div className={style.articleImage} style={{
                background: `url('${this.state.imageURL}')`
            }}>
            
                </div>

                <div className={style.articleText}
                dangerouslySetInnerHTML={{
                    __html:article.body
                }}
                >
                   
                </div>
                </div>

            </div>
        );
    }
}

export default NewsArticle;