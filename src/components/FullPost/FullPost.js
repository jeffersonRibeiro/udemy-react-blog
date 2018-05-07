import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  }

  componentDidUpdate() {
    const { id } = this.props;

    if(!!id && (((this.state.loadedPost || {}).id !== id) || !this.state.loadedPost)){
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
          this.setState({loadedPost: res.data});
        });
    }
  }

  deletePostHandler = () => {
    const { id } = this.props;

    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
          console.log(res);
        });
  }

  render () {
      let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
      if(!!this.props.id) {
        post = <p style={{textAlign: 'center'}}>Loading post...</p>;
      }
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