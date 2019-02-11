import React, { Component } from 'react';
// import axios from 'axios';
// import { BaseURL } from '../../../../config';
import style from '../../articles.css'
import Header from './header';
import VideosRelated from '../../../widgets/VideoList/VideoRealted/videorealted'
import { db , firebaseTeams , firebaselooper , firebaseVideos} from '../../../../fireabase';


class VideoArticle extends Component {

    state = {
        article: [],
        team: [],
        teams:[],
        related:[]

    }


    componentWillMount() {

        db.ref(`videos/${this.props.match.params.id}`).once('value')
            .then((snapshot) => {
                let article = snapshot.val();
                firebaseTeams.orderByChild("teamId").equalTo(article.team).once('value')
                    .then((snapshot) => {
                        const team = firebaselooper(snapshot);
                        this.setState({
                            article,
                            team
                        })

                        this.getRelated();
                    })
            })


        // axios.get(`${BaseURL}/videos?id=${this.props.match.params.id}`)
        //     .then(response => {
        //         let article = response.data[0];
        //         axios.get(`${BaseURL}/teams?id=${article.team}`)
        //             .then(response => {
        //                 this.setState({
        //                     article,
        //                     team: response.data
        //                 });

        //                 this.getRelated();

        //             })

        //     })
    }


    getRelated = () =>{

        firebaseTeams.once('value')
            .then((snapshot) => {
                const teams = firebaselooper(snapshot);
                firebaseVideos.orderByChild("team").equalTo(this.state.article.team).limitToFirst(3).once('value')
                .then((snapshot)=>{
                    const related = firebaselooper(snapshot);
                   
                    this.setState({
                         teams,
                         related
                    })

                   
                })
            })

            
        // axios.get(`${BaseURL}/teams`)
        // .then(response =>{
        //     let teams = response.data;

        //      axios.get(`${BaseURL}/videos?q=${this.state.team[0].city}&_limit=3`)
        //      .then(response =>{
                
        //         this.setState({
        //              teams,
        //              related: response.data
        //         })
        //      })
        // })
    }


    render() {
        const article = this.state.article;
       const team = this.state.team; 
        return (

            //team ? 'true' :'false'
            <div className={style.articleWrapper}>
                <Header teamData = {team[0]} />
                <div className={style.videoWrapper}>
                        <h1> {article.title}</h1>

                        <iframe title="videoplayer" width="100%" height="300px" 
                        src={`https://www.youtube.com/embed/${article.url}`}>

                        </iframe>
                </div>

                <VideosRelated data={this.state.related} teams={this.state.teams}/>
            </div>
        );
    }
}

export default VideoArticle;