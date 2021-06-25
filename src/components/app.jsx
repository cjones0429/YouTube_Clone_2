import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/searchBar';
import apiKeys from '../API-Keys.json'
import VideoDescription from './VideoDescription/videoDescription';
import VideoTitle from './VideoTitle/videoTitle';


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
        })
        this.getTitleAndDescription(videos.items[0].id.videoId);
        this.getRelatedVideoImages(relatedVideoIds);
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

    getRelatedVideoImages = async (relatedVideoIds) => {
        const relatedVideoImageUrls = relatedVideoIds.map(videoId=> {
            return axios
                .get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKeys.googleAPIKey}`)
                .then(response => response.data.items[0].snippet.thumbnails.default.url)
        });
        console.log(relatedVideoImageUrls);
        this.setState({
            relatedVideoImageUrls: relatedVideoImageUrls
        })
    }

     componentDidMount(){
         this.searchForVideo();
     }


    render() { 
        return ( 
            <div>
                <div>
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
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
                frameBorder="0">
                </iframe>
                <VideoDescription state={this.state}/>
            </div>
         );
    }
}
 
export default App;