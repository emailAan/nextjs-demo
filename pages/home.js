import React from 'react'
import NavBar from '../components/Navbar'

require('es6-promise').polyfill()
require('isomorphic-fetch')

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    let response = await fetch('http://localhost:8080/api/navigation')
    let navData = await response.json()

    return { navData }
  }

  render () {
    return (
      <div>
        <h1>Home</h1>
        <p>Dit is de home page </p>
        <NavBar navData={this.props.navData} />
      </div>
    )
  }
}
