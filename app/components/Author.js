import React from 'react'
import Post from './Post'
import { fetchUser } from '../utils/api'
import { formatDate } from '../utils/helpers'


export default class Author extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.updateUser(this.props.user)
  }

  updateUser(userID) {
    fetchUser(userID)
      .then((user) => this.setState({user}))
  }



  render() {
    
    if(this.state.user === null) {return null} 
    var {submitted, id, created, karma} = this.state.user

    return (
      <React.Fragment>
      <h1>{id}</h1>
      <div>joined in {formatDate(created)} and has {karma} karma</div>
      <Post items={submitted} commentsFiltered={true}
            setAuthor={this.props.setAuthor}
            setComment={this.props.setComment} 
      />
      </React.Fragment>
    )
  }
}