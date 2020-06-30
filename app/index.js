import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Top from './components/Top' 
import New from './components/New'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends React.Component {
  render() {
    return  (
    <Router>
      <div>
        <div className="wrapper">
          <Route exact path='/' component={Top} />
          <Route exact path='/new' component={New} />
        </div>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)