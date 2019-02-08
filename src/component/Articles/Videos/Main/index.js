import React from 'react';
import VideosList from '../../../widgets/VideoList/videolist'

const VideosMain = () =>{

    return(<div>
        <VideosList type="card" loadmore={true} title={false} start={0} amount={10} />
    </div>)
}


export default VideosMain;