import React from 'react'
import Router, {withRouter} from 'next/router'
import { Provider } from 'mobx-react'
import {computed, action, observable} from 'mobx'

import Dashboard from '../components/dashboard'

// import {toJS} from 'mobx-utils'

require('es6-promise').polyfill()
require('isomorphic-fetch')

/**
 *
 */
class DashboardModel {
  @observable id = ''
  @observable title = 'Dashboard'
  @observable module = ''
  @observable parameters = {}
  @observable navData = []

  constructor (data) {
    this.setState(data)
  }

  @action setState ({id, title, module, parameters, navData}) {
    this.id = id
    this.title = title
    this.navData = navData
    this.module = module
    this.parameters = parameters
  }

  @computed get info () {
    return `Dashboard; ${this.title} (${this.id}) ${this.module ? '[' + this.module + ']' : ''}`
  }

  @action currentModule (module) {
    this.module = module
  }
}

class DashboardWrapper extends React.Component {
  static async getInitialProps ({query, req}) {
    let response = await fetch('http://localhost:3000/api/dashboard/' + query.id)
    let dashboardInfo = await response.json()

    return { dashboardInfo, id: query.id, module: query.module, parameters: query.parameters }
  }

  constructor (props) {
    super(props)

    this.dashboardModel = new DashboardModel({
      id: this.props.id,
      ...this.props.dashboardInfo,
      module: this.props.module,
      parameters: this.props.parameters
    })

    this.openContent = this.openContent.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { id, module: m, parameters } = nextProps.router.query

    this.dashboardModel.id = id
    this.dashboardModel.module = m
    this.dashboardModel.parameters = parameters
  }

  parameterToUrl (p) {
    if (!p) {
      return ''
    }
    return Object.keys(p)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(p[key]))
      .join('&')
  }

  openContent (m, p) {
    const urlParameters = this.parameterToUrl(p)

    Router.push({
      pathname: '/dashboard',
      query: { id: this.dashboardModel.id, module: m, p }
    }, `/d/${this.dashboardModel.id}/${m || ''}${urlParameters ? '?' + urlParameters : ''}`,
    {shallow: true})
  }

  render () {
    return (
      <Provider openContent={this.openContent} dashboard={this.dashboardModel}>
        <Dashboard />
      </Provider>
    )
  }
}

export default withRouter(DashboardWrapper)
