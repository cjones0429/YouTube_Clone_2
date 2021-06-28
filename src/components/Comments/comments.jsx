import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments: '',
            errors: {
                comments: ''
            }
         }
    }

    handleChange = (e) => {
        let errors = this.state.errors;

        switch(e.target.name){
            case 'comments':
                errors.comments = e.target.value.length < 1 ? "Comment must be at least 1 character" : null;
                break;
        }
        this.setState({
            [e.target.name]: e.target.value,
            errors: errors
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let comment = {
            video_id: this.props.state.videoId,
            comment: this.state.comments,
            likes: 0,
            dislikes: 0
        };
        this.props.postComment(comment)
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Add Comment:</label>
                    <input type="text" name="comments" value={this.state.comments} onChange={this.handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
         );
    }
}
 
export default Comment;