import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import './Posts.css';
import {Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {

  state = {
    posts: []
    // selectedPostId: null,
    // error: false
  };

  componentDidMount() {
    // console.log(this.props);
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Serhii'
          }
        });
        this.setState({posts: updatedPosts});
      })
      .catch(error => {
        console.log(error);
        //this.setState({error: true});
      });
  }

  postSelectHandler = (id) => {
    console.log(this.props);
    // this.setState({selectedPostId: id});
    this.props.history.push({pathname: '/posts/' + id});
    // this.props.history.push('/' + id); // same as this.props.history.push({pathname: '/' + id});
  };

  render() {
    const posts = this.state.posts.map(post => {
      return (

        <Post
          key={post.id}
          author={post.author}
          title={post.title}
          body={post.body}
          clicked={() => {
            this.postSelectHandler(post.id)
          }}
        />

      );
    });

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route exact path={this.props.match.url + '/:id'} component={FullPost}/>
      </div>
    );
  }
}

export default Posts;
