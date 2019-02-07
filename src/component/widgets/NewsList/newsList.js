import React, { Component } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BaseURL } from '../../../config';
import style from './newsList.css'
import Button from '../Buttons/button'
class NewsList extends Component {

    state = {
        items:[],
        teams:[],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
        loadmore: this.props.loadmore,
        type : this.props.type
    }

    componentWillMount(){

       this.request(this.state.start,this.state.end);
    }

    request = (start,end) => {

        if (this.state.teams.length < 1) {
            
        }

    axios.get(`${BaseURL}/articles?_start=${start}&_end=${end}`)
        .then(Response => {
            this.setState({
                items: [...this.state.items, ...Response.data]
            })
        })
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end, end);
    }


renderNews = (type) => {
let tempelate = null;

switch (type) {
    case ('card'):
    tempelate = this.state.items.map((item,i) =>{
        return (
            < CSSTransition classNames = {
                {
                    enter: style.newsList_wrapper,
                    enterActive: style.newsList_wrapper_enter
                }
            } timeout={500} key={i} >
        <div >
                        <div className={style.newslist_item}>
                            <Link to={`/articles/${item.id}`}> 
                            
                            <h2>{item.title}</h2>
                            </Link>
                        </div>
                    </div>
            </CSSTransition>
           
        )
    })

        break;
    default:
    tempelate = null
        break;
}

    return tempelate;
}



    render() {
        //console.log(this.state.items);
        return (
            <div>
                <TransitionGroup component="div" className="list">
                {this.renderNews(this.props.type)}
                </TransitionGroup>
                <Button type="loadmore" loadMore={()=>this.loadMore()} cta="Load More News"/>

                
            </div>
        );
    }
}

export default NewsList;