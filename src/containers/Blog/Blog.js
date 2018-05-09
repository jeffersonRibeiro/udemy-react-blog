import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
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

  render () {
    const posts = this.state.posts.map(p => {
      return(
        <Post 
            key={p.id}
            title={p.title}
            author={p.author}
            clicked={() => this.postSelectedHandler(p.id)}
        />
      );
    });
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;