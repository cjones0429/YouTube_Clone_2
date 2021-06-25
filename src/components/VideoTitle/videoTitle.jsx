import React from 'react';
import './videoTitle.css';

function VideoTitle(props){
    return(
        <div className="video-title">
            <h2>{props.state.videoTitle}</h2>
        </div>
    )
}

export default VideoTitle;