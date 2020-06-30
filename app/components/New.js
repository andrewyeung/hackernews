import React from 'react'
import { fetchNew } from '../utils/api'
import Loading from './Loading'
import Post from './Post'
import Author from './Author'
import Nav from './Nav'
import Comment from './Comment'

export default class New extends React.Component {
  constructor (props){
    super(props)

    this.state = {
      newStories: null,
      authorViewed: null,
      postComment: null,
    }

    this.updateNew = this.updateNew.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount () {
    this.mounted = true
    this.updateNew()
  }

  componentDidUpdate () {
    this.updateNew()
  }

  componentWillUnmount () {
    this.mounted = false
  }

  updateNew () {
    fetchNew()
    .then((data) => {
      if(this.mounted) {
        this.setState({newStories: data})
      }
    })
  }

  isLoading() {
    const { newStories, authorViewed, postComment } = this.state

    return !newStories && !authorViewed && !postComment
  }

  render() {
    return (
    <React.Fragment>
    <Nav />

    {this.isLoading() && <Loading />}
    
    {this.state.authorViewed && 
    <Author user={this.state.authorViewed} 
            setAuthor={(user) => {
              this.setState({newStories: null, authorViewed: user, postComment: null}) }
            }
            setComment={(comment) => this.setState({newStories: null, authorViewed: null, postComment: comment})} 
    /> }

    {this.state.postComment && 
      <Comment comment={this.state.postComment} 
              setAuthor={(user) => {
                this.setState({newStories: null, authorViewed: user, postComment: null}) }
              }
      />
    }
     
    {this.state.newStories && !this.state.authorViewed && !this.state.postComment &&
      <Post items={this.state.newStories} 
            setAuthor={(user) => {
              this.setState({newStories: null, authorViewed: user}) }
            }
            setComment={(comment) => this.setState({newStories: null, authorViewed: null, postComment: comment})} 
            
      /> 
    }
    </React.Fragment>
    )
  }
}