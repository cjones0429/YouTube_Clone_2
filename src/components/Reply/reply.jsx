import React, { Component } from 'react';

class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            reply: '',
            errors: {
                reply: ''
            }
         }
    }

    handleChange = (e) => {
        let errors = this.state.errors;

        switch(e.target.name){
            case 'reply':
                errors.comments = e.target.value.length < 1 ? "Reply must be at least 1 character" : null;
                break;
        }
        this.setState({
            [e.target.name]: e.target.value,
            errors: errors
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let reply = {
            comment_id: this.props.comment.id,
            message: this.state.reply
        };
        this.props.postReply(reply)
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Add Reply:</label>
                    <input type="text" name="reply" value={this.state.reply} onChange={this.handleChange} />
                    <button type="submit">Reply</button>
                </form>
            </div>
         );
    }
}
 
export default Reply;