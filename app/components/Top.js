import React from 'react'
import { fetchTop } from '../utils/api'
import Loading from './Loading'
import Post from './Post'
import Author from './Author'
import Nav from './Nav'
import Comment from './Comment'

export default class Top extends React.Component {
  constructor (props){
    super(props)

    this.state = {
      topStories: null,
      authorViewed: null,
      postComment: null,
    }

    this.updateTop = this.updateTop.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount () {
    this.Mounted = true
    this.updateTop()
  }

  componentDidUpdate () {
    this.updateTop()
  }

  componentWillUnmount () {
    this.Mounted = false
  }

  updateTop () {
    fetchTop()
    .then((data) => {
      if(this.Mounted) {
        this.setState({topStories: data})
      }
    })
  }

  isLoading () {
    const { topStories, authorViewed, postComment } = this.state
    return !topStories && !authorViewed && !postComment
  }

  render() {
    return (
    <React.Fragment>
    <Nav />

    {this.isLoading() && <Loading />}
    
    {this.state.authorViewed && 
    <Author user={this.state.authorViewed} 
            setAuthor={(user) => {
              this.setState({topStories: null, authorViewed: user, postComment: null}) }
            }
            setComment={(comment) => this.setState({topStories: null, authorViewed: null, postComment: comment})} 
    /> }

    {this.state.postComment && 
      <Comment comment={this.state.postComment} 
              setAuthor={(user) => {
                this.setState({topStories: null, authorViewed: user, postComment: null}) }
              }
      />
    }
     
    {this.state.topStories && !this.state.authorViewed && !this.state.postComment &&
      <Post items={this.state.topStories} 
            setAuthor={(user) => {
              this.setState({topStories: null, authorViewed: user}) }
            }
            setComment={(comment) => this.setState({topStories: null, authorViewed: null, postComment: comment})} 
            
      /> 
    }
    </React.Fragment>
    )
  }
}