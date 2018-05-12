import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect }from 'react-router-dom';


import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import Page404 from '../../components/Page404';

class Blog extends Component {
  state = {
    auth: false,
  }
  
  render () {
    
    return (
      <div className="Blog">
      <header>
        <nav>
        <ul>
          <li><NavLink exact to="/posts">Posts</NavLink></li>
          <li><NavLink to={{
            pathname: '/new-post',
            hash: '#submit',
            search: '?quick=true',
          }}>New Posts</NavLink></li>
        </ul>
        </nav>
      </header>
      
      <Switch>
        <Route path="/new-post" component={NewPost} />
        <Route path="/posts/" component={Posts} />
        <Route component={Page404} />
      </Switch>
      
      </div>
    );
  }
}

export default Blog;