import React from 'react';
import Reply from '../Reply/reply';


function DisplayComments(props){
    const comments = props.state.comments.filter((comment)=> comment.video_id === props.state.videoId);
    if (comments.length > 0){
        let commentsDivs = comments.map((comment)=>{
            const replies = props.state.replies.filter((reply)=> comment.id === reply.comment_id);
            if(replies.length > 0){
                const replyDivs = replies.map((reply)=>
                    <div>
                        <p1>{reply.message}</p1>
                    </div>
                );
                return(
                    <div>
                        <div>
                            <h2>Comment I.D.:{comment.id}</h2>
                            <p1>{comment.comment}</p1>
                        </div>
                        <div>
                            <h3>Replies:</h3>
                            <Reply postReply={props.postReply} comment={comment}/>
                            {replyDivs}
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div>
                            <h2>Comment I.D.:{comment.id}</h2>
                            <p1>{comment.comment}</p1>
                        </div>
                        <div>
                            <h3>Replies:</h3>
                            <Reply postReply={props.postReply} comment={comment}/>
                            <p1>No Replies</p1>
                        </div>
                    </div>
                )
            }
        });
        return(
            <div>
                {commentsDivs}
            </div>
        )
    }
    else{
        return(
            <div><h2>No Comments</h2></div>
        )
    }
}

export default DisplayComments;