import React from 'react';
import "./videoDescription.css"

function VideoDescription(props){
    return(
        <span className="video-description">
            <p1>{props.state.videoDescription.length > 300 ? `${props.state.videoDescription.substring(0, 300)}...` : props.state.videoDescription}</p1>
        </span>
    )
}

export default VideoDescription;