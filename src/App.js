import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import { fetchPatients, updatePatientsInService } from './actions'
import Navigation from './components/Navigation'
import Content from './components/Content'
import './App.css'

const rootStyle = {
  display: 'flex'
}

class App extends Component {
  componentDidMount() {
    this.props.fetchPatients()

    setInterval(() => {
      this.props.updatePatientsInService()
    }, 1000)
  }

  render() {
    return (
      <HashRouter>
        <div style={rootStyle}>
          <CssBaseline />
          <Navigation />
          <Content />
        </div>
      </HashRouter>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, { fetchPatients, updatePatientsInService })(App)