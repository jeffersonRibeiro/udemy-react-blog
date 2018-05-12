import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData = () => {
    const { id } = this.props.match.params;

    if(!!id && (((this.state.loadedPost || {}).id !== +id) || !this.state.loadedPost)){
      axios.get(`/posts/${id}`)
        .then(res => {
          this.setState({loadedPost: res.data});
        });
    }
  }

  deletePostHandler = () => {
    const { id } = this.props.match.params;

    axios.delete(`/posts/${id}`)
        .then(res => {
          console.log(res);
        });
  }

  render () {
    let post = <p style={{textAlign: 'center'}}>Loading post...</p>;
    
    if(!!this.state.loadedPost){
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
              <button onClick={this.deletePostHandler} className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    
    return post;
  }
}

export default FullPost;