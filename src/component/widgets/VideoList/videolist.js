import React, { Component } from 'react';
import style from './videolist.css'
// import axios from 'axios';
// import { BaseURL } from '../../../config';
import Button from '../Buttons/button'
import VideosListTemplate from './VideosListTemplate'
import { firebaseVideos, firebaseTeams , firebaselooper } from '../../../fireabase';

class videolist extends Component {

    state = {
        teams:[],
        videos:[],
        start : this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
    }

renderTitle = () => {
    return this.props.title ? <h3><strong>NBA</strong> Videos</h3 > : null
}

renderButton = () => {
    return this.props.loadmore ?  <Button type="loadmore" loadMore={()=>this.loadMore()} cta="Load More News"/>  : <Button type="linkTo" cta="More Videos" linkTo="/videos"/>
}


 componentWillMount() {

     this.request(this.state.start, this.state.end);
 }
    request = (start, end) => {

        if (this.state.teams.length < 1) {
           firebaseTeams.once('value')
               .then((snapshot) => {
                   const teams = firebaselooper(snapshot);
                   this.setState({
                       teams
                   })
               })
        }

          firebaseVideos.orderByChild("id").startAt(start).endAt(end).once('value')
              .then((snapshot) => {
                  const videos = firebaselooper(snapshot);
                  this.setState({
                      videos: [...this.state.videos, ...videos],
                      start,
                      end
                  })
              })
              .catch(e => {
                  console.log(e);
              })
    }

        loadMore = () => {
            let end = this.state.end + this.state.amount;
            this.request(this.state.end, end);
        }

        renderVideos = () =>{

            let template = null;

            switch (this.props.type) {
                case ('card'):
                    template = <VideosListTemplate data={this.state.videos} teams={this.state.teams}/> 
                    break;
            
                default:
                template = null
                    break;
            }

            return template
        }


    render() {
        return (
            <div className={style.videoList_wrapper}>
                {this.renderTitle()}

                { this.renderVideos()}

                {this.renderButton()}
            </div>
        );
    }
}

export default videolist;