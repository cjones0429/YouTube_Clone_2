import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar/searchBar';
import apiKeys from '../API-Keys.json'
import VideoDescription from './VideoDescription/videoDescription';
import VideoTitle from './VideoTitle/videoTitle';
import RelatedVideos from './RelatedVideos/relatedVideos';
import DisplayComments from './DisplayComments/displayComments';
import Comment from './Comments/comments';
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
            comments: [],
            replies: []
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

    getCommentsAndReplies = async () => {
        let commentResponse = await axios.get('http://127.0.0.1:8000/comments/');
        console.log(commentResponse.data);
        let repliesResponse = await axios.get('http://127.0.0.1:8000/replies/');
        console.log(repliesResponse.data);
        this.setState({
            comments: commentResponse.data,
            replies: repliesResponse.data
        });
    }

    postComment = async (comment) =>{
        await axios.post('http://127.0.0.1:8000/comments/', comment);
        this.getCommentsAndReplies();
    }

    postReply = async (reply) =>{
        await axios.post('http://127.0.0.1:8000/replies/', reply);
        this.getCommentsAndReplies();
    }

    likeComment = async (comment) =>{
        await axios.patch(`http://127.0.0.1:8000/comments/${comment.id}/`, { "likes": comment.likes + 1});
        this.getCommentsAndReplies();
    }

    dislikeComment = async (comment) =>{
        await axios.patch(`http://127.0.0.1:8000/comments/${comment.id}/`, { "dislikes": comment.dislikes + 1});
        this.getCommentsAndReplies();
    }

     componentDidMount(){
         this.searchForVideo();
         this.getCommentsAndReplies();
     }


    render() { 
        return ( 
            <React.Fragment>
                <div className="main-title">
                <center>
                    <h1>Welcome to YouSearch!</h1>
                </center>
                </div>
                <div>
                    <br/>
                    <SearchBar searchForVideo={this.searchForVideo}/>
                    <br/>
                </div>
                <VideoTitle state={this.state}/>
                <br/>
                <center>
                    <span>
                        <iframe className="iframe" title="title" id="ytplayer" type="text/html" width="640" height="360"
                        src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
                        frameBorder="0"> </iframe>
                    </span>
                    <VideoDescription state={this.state}/>
                </center>
                    <div className="related">
                    <RelatedVideos relatedVideoImageUrls={this.state.relatedVideoImageUrls} relatedVideoIds={this.state.relatedVideoIds} searchForVideo={this.searchForVideo}/>
                    </div>
                    <div className="addcomment">
                       <Comment postComment={this.postComment} state={this.state}/>     
                    </div>
                         
                    <div className="comments">
                        <DisplayComments state={this.state} postReply={this.postReply} likeComment={this.likeComment} dislikeComment={this.dislikeComment}/>
                    </div>
                    <br/>       
            </React.Fragment>
         );
    }
}
 
export default App;