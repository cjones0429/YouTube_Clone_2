import React from 'react';


function DisplayComments(props){
    const comments = props.state.comments.filter((comment)=> comment.video_id === props.state.videoId);
    if (comments.length > 0){
        for (let i = 0; i < comments.length; i++){
            const replies = props.state.replies.filter((reply)=> comments[i].id === reply.comment_id);
            if(replies.length > 0){
                const replyDivs = replies.map((reply)=>
                    <div>
                        <p1>{reply.message}</p1>
                    </div>
                );
                return(
                    <div>
                        <div>
                            <h2>Comment I.D.:{comments.id}</h2>
                            <p1>{comments[i].comment}</p1>
                        </div>
                        <div>
                            <h3>Replies:</h3>
                            {replyDivs}
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div>
                            <h2>Comment I.D.:{comments.id}</h2>
                            <p1>{comments[i].comment}</p1>
                        </div>
                        <div>
                            <h3>Replies:</h3>
                            <p1>No Replies</p1>
                        </div>
                    </div>
                )
            }
        }
    }
    else{
        return(
            <div><h2>No Comments</h2></div>
        )
    }
}

export default DisplayComments;