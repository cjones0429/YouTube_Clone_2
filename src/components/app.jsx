import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/searchBar';
import Comments from './Comments/comments';
import apiKeys from '../API-Keys.json'
import VideoDescription from './VideoDescription/videoDescription';
import VideoTitle from './VideoTitle/videoTitle';
import RelatedVideos from './RelatedVideos/relatedVideos';
import './app.css'



class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videoId: '2RQh0BOoBbQ',
            relatedVideoIds: [],
            videoTitle: '',
            videoDescription: '',
            relatedVideoImageUrls: [],
        }
    }


    searchForVideo = async (searchQuery) => {

        if (searchQuery === undefined){
            searchQuery = '2RQh0BOoBbQ';
        };
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&maxResults=6&key=${apiKeys.googleAPIKey}`)
        console.log(response.data);
        let videos = response.data;
        let relatedVideoIds = [];
        let relatedVideoImageUrls = [];
        if (videos.items.length > 1){
            for (let i = 1; i < videos.items.length; i++){
                relatedVideoIds.push(videos.items[i].id.videoId);
                relatedVideoImageUrls.push(videos.items[i].snippet.thumbnails.default.url);
            }
        }
        console.log(relatedVideoIds);
        console.log(relatedVideoImageUrls);
        this.setState({
            videoId: videos.items[0].id.videoId,
            relatedVideoIds: relatedVideoIds,
            relatedVideoImageUrls: relatedVideoImageUrls,
        })
        this.getTitleAndDescription(videos.items[0].id.videoId);
    }

    getTitleAndDescription = async (videoId) => {
        if (videoId === undefined){
            videoId = '2RQh0BOoBbQ';
        }
        let response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${this.state.videoId}&key=${apiKeys.googleAPIKey}`);
        console.log(response.data);
        this.setState({
            videoTitle: response.data.items[0].snippet.title,
            videoDescription: response.data.items[0].snippet.description
        })
    }

     componentDidMount(){
         this.searchForVideo();
     }


    render() { 
        return ( 
            <div>
                <div className="main-title">
                <center>
                    <h1>YouTube Clone</h1>
                </center>
                </div>
                <div>
                    <br/>
                    <SearchBar searchForVideo={this.searchForVideo}/>
                    <br/>
                </div>
                <VideoTitle state={this.state}/>
                <iframe className="iframe" title="title" id="ytplayer" type="text/html" width="640" height="360"
                src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
                frameBorder="0">
                <br/>
                </iframe>
                <VideoDescription state={this.state}/>
                <RelatedVideos relatedVideoImageUrls={this.state.relatedVideoImageUrls}/>
            </div>
         );
    }
}
 
export default App;