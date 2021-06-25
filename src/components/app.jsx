import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/searchBar';
import apiKeys from '../API-Keys.json'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videoId: '2RQh0BOoBbQ',
            relatedVideoIds: []
        }
    }

    searchForVideo = async (searchQuery) => {

        if (searchQuery == undefined){
            searchQuery = '2RQh0BOoBbQ';
        };
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&key=${apiKeys.googleAPIKey}`)
        console.log(response.data);
        let videos = response.data;
        let relatedVideoIds = [];
        if (videos.items > 1){
            for (let i = 1; i < videos.items.length; i++){
                relatedVideoIds.push(videos.items[i].id.videoId)
            }
        }
        console.log(relatedVideoIds);
        this.setState({
            videoId: videos.items[0].id.videoId,
            relatedVideoIds: relatedVideoIds,
        })
    }
// response.data.items[0]


     componentDidMount(){
         this.searchForVideo();
     }


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
                frameBorder="0">
                </iframe>
            </div>
         );
    }
}
 
export default App;