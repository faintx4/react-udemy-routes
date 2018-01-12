import React, {Component} from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

  state = {
    selectedPost: null
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    console.log('NextState.selectedPost', nextState.selectedPost);
    console.log('!this.state.selectedPost', !this.state.selectedPost);
    return !this.state.selectedPost || (this.state.selectedPost.id !== nextProps.id);
  }*/

  componentDidMount() {
    console.log(this.props);
    this.loadData();
  }


  componentDidUpdate(prevProps, prevState) {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (!this.state.selectedPost || (this.state.selectedPost.id !== +this.props.match.params.id)) {
        axios.get(`/posts/${this.props.match.params.id}`)
          .then(response => {
            this.setState({selectedPost: response.data});
          });
      }

    }
  }


  deletePostHandler = () => {
    axios.delete(`/posts/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
      });
  };

  render() {
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

    if (this.props.match.params.id) {
      post = <p style={{textAlign: 'center'}}>Loading...</p>;
    }

    if (this.state.selectedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.selectedPost.title}</h1>
          <p>{this.state.selectedPost.body}</p>
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