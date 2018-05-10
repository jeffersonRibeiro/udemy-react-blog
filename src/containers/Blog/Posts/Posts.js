import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';

import './Posts.css';

class Posts extends Component {
  
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('/posts')
          .then(res => {
            const posts = res.data.slice(0, 4);
            const updatedPosts = posts.map(p => {
              return({
                ...p,
                author: 'Max',
              });
            });

            this.setState({posts: updatedPosts});
          })
          .catch(err => console.log(err));
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  }

  render() {
    const posts = this.state.posts.map(p => {
      return(
        <Link to={'/' + p.id} key={p.id}>
          <Post 
            title={p.title}
            author={p.author}
            clicked={() => this.postSelectedHandler(p.id)}
          />
        </Link>
      );
    });

    return(
      <section className="Posts">
        {posts}
      </section>
    );
  }
}

export default Posts