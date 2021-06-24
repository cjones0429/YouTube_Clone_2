import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/searchBar';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videoId: '2RQh0BOoBbQ'
        }
    }

    searchForVideo = async (searchQuery) => {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=AIzaSyC_TUmTIqQx4r4y8Y16DpOQNoxRkNuIkl4`)
        console.log(response.data);
        let videos = response.data;
        this.setState({
            videoId: videos.items[0].id.videoId
        })
    }
// response.data.items[0]

    // componentDidMount(){
    //     this.searchForVideo();
    // }

    render() { 
        return ( 
            <div>
                {/* <div> */}
                <center>
                    <h1>YouTube Clone</h1>
                </center>
                {/* </div> */}
                
                <br/>
                <SearchBar searchForVideo={this.searchForVideo}/>
                <br/>
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
                frameborder="0">
                </iframe>
            </div>
         );
    }
}
 
export default App;