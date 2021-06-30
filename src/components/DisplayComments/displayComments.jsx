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
                        <div className="buttons">
                            <div>
                                {/* <h4>Comment ID: {comment.id}</h4> */}
                                <h6>Likes: {comment.likes} <button color="#08C165" className="like" onClick={()=>props.likeComment(comment)}>Like</button> Dislikes: {comment.dislikes} <button className="dislike" onClick={()=>props.dislikeComment(comment)}>Dislike</button></h6>
                            </div>
                        </div>
                        <div>
                            <span>
                                <h4>Comments:</h4>
                                <p1>{comment.comment}</p1>
                            </span>
                        </div>
                        <br/>
                        <div>
                            <span>
                                <h4>Replies:</h4>
                                {replyDivs}
                                <Reply postReply={props.postReply} comment={comment}/>
                            </span>
                        </div>
                    </div>
                    
                )
            }else{
                return(
                    <div>
                        <div>
                            <br/>
                            <h4>Comment:</h4>
                            <p1>{comment.comment}</p1>
                        </div>
                        <br/>
                        <div>
                            <h4>Replies:</h4>
                            <p1>No Replies</p1>
                            <Reply postReply={props.postReply} comment={comment}/>
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