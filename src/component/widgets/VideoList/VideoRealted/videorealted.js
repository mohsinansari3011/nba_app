import React from 'react';
import style from '../videolist.css'
import VideoListTemplate from '../VideosListTemplate';



const VideosRelated = (props) =>{

    return(<div className={style.realtedWrapper}>
    <VideoListTemplate data={props.data} teams={props.teams}  />
   
    
    </div>)

}

export default VideosRelated;