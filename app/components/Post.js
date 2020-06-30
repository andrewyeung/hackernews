import React from 'react'
import Loading from './Loading'
import {fetchItemDataWithPosts, fetchItemData} from '../utils/api'
import { formatDate } from '../utils/helpers'

export default class Post extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: null
    }

    this.isLoading = this.isLoading.bind(this)
  }
  
  componentDidMount () {
    this.updatePost()
  }

  updatePost () {

    if(this.props.commentsFiltered) {
      fetchItemDataWithPosts(this.props.items)
        .then((item) => this.setState({data: item}))
    } else {
      fetchItemData(this.props.items)
      .then((item) => this.setState({data: item}))
    }
  }

  isLoading () {
    const { data } = this.state
    return !data
  }

  render () {
    const { setAuthor, setComment } = this.props

    if(this.isLoading()) {return <Loading />}

    return (
      <React.Fragment>
        <ul style={{color: '#296d98', listStyle:'none'}}>
          {this.state.data.map((item, index) => (
            <li key={index} className="item-box">
              <div className="ranking">{index + 1}.</div>
              <div className="item-content">
              <a href={item.url} className="title">{item.title}</a>
              <div>
                by <a onClick={() => setAuthor(item.by)} className="author-link">{item.by}</a> 
                &nbsp;on {formatDate(item.time)} 
                &nbsp;with <a onClick={() => setComment(item)} className="comment-link">{item.descendants}</a> comments
              </div>
              </div>
            </li>
          ))}
        </ul>
      </ React.Fragment>
    )
  }
}