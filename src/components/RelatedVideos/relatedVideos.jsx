import React from 'react';
import ImageButton from 'react-image-button';

function RelatedVideos(props){
    const relatedVideos = props.relatedVideoImageUrls.map((imageUrl)=> 
        <span>
            <input type="image" src={imageUrl} />
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