import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

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
    this.props.history.push(`${this.props.match.url}/${id}`);
  }

  render() {
    const posts = this.state.posts.map(p => {
      return(
        // <Link to={`${this.props.match.url}/${p.id}`} key={p.id}>
          <Post 
            key={p.id}
            title={p.title}
            author={p.author}
            clicked={() => this.postSelectedHandler(p.id)}
          />
        // </Link>
      );
    });

    return(
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} component={FullPost} />
      </div>
    );
  }
}

export default Posts