import React from 'react'
import {NavLink, Link} from 'react-router-dom'

const activeStyle = {
  color: '#F3F713'
}

export default function Nav () {
 return (
   <nav className="navbar">
    <img src="https://news.ycombinator.com/y18.gif" className="icon" />
    <Link to="/" className="nav-link">Hacker News Clone by Andrew</Link>
    <NavLink to='/' exact activeStyle={activeStyle} className="nav-link" onClick={() => window.location.reload()} >Top</NavLink>
    <NavLink to='/new' exact activeStyle={activeStyle} className="nav-link" onClick={() => window.location.reload()} >New</NavLink>
   </nav>
 )
}