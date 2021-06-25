import React, { Component } from 'react';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments: ''
         }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Comment:</label>
                    <input type="text" name="searchQuery" value={this.state.comments} onChange={this.handleChange} />
                    <button type="submit">Comment</button>
                </form>
            </div>
         );
    }
}
 
export default Comment;