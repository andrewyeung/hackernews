import React from 'react'
import { fetchComments } from '../utils/api'
import { formatDate } from '../utils/helpers'
import Loading from './Loading'

export default class Comment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: null
    }

    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    this.updateKids(this.props.comment.kids)
  }

  updateKids(commentsArray) {
    fetchComments(commentsArray)
      .then((res) => this.setState({comments: res}))
  }

  isLoading() {
    const { comments } = this.state

    return !comments
  }

  render () {
    const {title, by, time, descendants} = this.props.comment

    return (
      <React.Fragment>
      <h1>{title}</h1>
      <p>by {by} on {formatDate(time)} with {descendants} comments</p>
      {this.isLoading() && <Loading />}
      {(this.state.comments) &&
      <ul style={{color: '#296e98', listStyle:'none'}}>
        {
          this.state.comments.map(({by, time, text}, index) => (
            <li key={index} className="comment-box">
              <span style={{fontWeight: "600"}}>#{index + 1}</span>  by <a onClick={() => this.props.setAuthor(by)} className="author-link">{by}</a> 
              &nbsp;on {formatDate(time)}
              <p dangerouslySetInnerHTML={{__html: text}} className="comment-block"/>
            </li>
          ))
        }
      </ul>
      }
      </ React.Fragment>
    )
  }
}