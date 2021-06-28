import React from 'react';

function RelatedVideos(props){
    const relatedVideos = props.relatedVideoImageUrls.map((imageUrl, index)=> 
        <span>
            <input type="image" src={imageUrl} onClick={()=>props.searchForVideo(props.relatedVideoIds[index])}/>
        </span>
    );
    
    return(
        <div>
            <div>
                <h1>Related Videos:</h1>
            </div>
            <div>
                {relatedVideos}
            </div>
        </div>
    )
}

export default RelatedVideos;