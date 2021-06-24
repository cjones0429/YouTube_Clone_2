import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchQuery: '',
            errors: {
                searchQuery: ''
            }
        }
    }

    handleChange = (e) => {
        let errors = this.state.errors

        switch(e.target.name){
            case 'searchQuery':
                errors.title = e.target.value.length < 1 ? "Search must be at least 1 character" : null;
                break;
        }

        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e, props) => {
        e.preventDefault();
        let searchQuery = {
            searchQuery: this.state.searchQuery
        };

        props.searchForVideo(searchQuery)
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={(e) => this.handleSubmit(e, this.props)}>
                    <label>Search for Videos:</label>
                    <input type="text" name="searchQuery" value={this.state.searchQuery} onChange={this.handleChange} />
                    {this.state.errors.searchQuery ? <p style={{color:'red'}}>{this.state.errors.searchQuery}</p> : ''}
                </form>
                <button type="submit">Search</button>
            </div>
        );
    }
}
 
export default SearchBar;