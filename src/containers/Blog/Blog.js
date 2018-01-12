import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Blog.css';
import Posts from "./Posts/Posts";
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});


class Blog extends Component {

  state = {
    auth: true
  };

  render() {
    // let errorMessage = this.state.error ?
    //   <div style={{color: 'red', textAlign: 'center'}}>Something went wrong!</div> : null;

    return (
      <div className="Blog">
        {/*<div>{errorMessage}</div>*/}
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  activeClassName="active"
                  activeStyle={{
                    textDecoration: 'underline'
                  }}>Posts</NavLink>
              </li>
              <li><NavLink to={{
                pathname: '/new-post',
                hash: '#submit',
                search: '?quick-submit=true'
              }}>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/*<Route exact path="/" render={() => <Posts/>}/>*/}
        <Switch>
          {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}

          <Route path="/posts" component={Posts}/>
          {/*404 Handling*/}
          <Route render={() => <h1>Page Not Found</h1>}/>
          {/*<Redirect from="/" to="/posts"/>*/}
        </Switch>


      </div>

    );
  }
}

export default Blog;