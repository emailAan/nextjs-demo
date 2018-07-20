import React, {Fragment} from 'react'
import {withRouter} from 'next/router'
import css from 'styled-jsx/css'

import Navbar from '../components/Navbar'

require('es6-promise').polyfill()
require('isomorphic-fetch')

let headerCss = css`
div.top {
    height: 40px;
    padding-left: 5px;
    margin-right: 5px;
    background-color: #5c646c;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    display:flex;
}
.top > .middle {
    margin:2px;
}
`

const Header = ({left, middle, right}) => (
  <Fragment>
    <div className='top'>
      <div className='left'>
        {left}
      </div>
      <div className='middle'>
        {middle}
      </div>
      <div className='right'>
        {right}
      </div>
    </div>
    <style jsx>{headerCss}</style>
  </Fragment>
)

const Container = ({children}) => (
  <Fragment>
    <div>
      {children}
    </div>
  </Fragment>
)

const Title = ({value}) => <span style={{fontSize: '26px'}} >{value}</span>

class Dashboard extends React.Component {
  static async getInitialProps ({query, req}) {
    let response = await fetch('http://localhost:3000/api/dashboard/' + query.id)
    let dashboardInfo = await response.json()

    return { dashboardInfo, id: query.id, module: query.module }
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    console.log('Dashboard is mounted')
  }

  loadDashboard () {
    return <span>dashboard...</span>
  }

  loadModule (module) {
    return <span>{module}</span>
  }

  getContent () {
    const { module } = this.props

    return (
      <Fragment>
        { module ? this.loadModule(module) : this.loadDashboard()}
      </Fragment>
    )
  }

  render () {
    var {title, navData} = this.props.dashboardInfo

    return (
      <Fragment>
        <Navbar dashboardId={this.props.id} navData={navData} />
        <Header
          left={(
            <img src='/brandImage.png' />
          )}
          middle={(
            <Title value={title} />
          )} />
        <Container>
          {this.getContent()}
        </Container>
      </Fragment>
    )
  }
}

export default withRouter(Dashboard)
