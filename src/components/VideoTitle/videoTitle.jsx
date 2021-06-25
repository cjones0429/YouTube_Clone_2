import React from 'react';
import './videoTitle.css';

function VideoTitle(props){
    return(
        <div className="video-title">
            <h1>{props.state.videoTitle}</h1>
        </div>
    )
}

export default VideoTitle;