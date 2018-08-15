import React from 'react'
import Router, {withRouter} from 'next/router'
import { Provider, inject } from 'mobx-react'
import * as mobx from 'mobx'

import Dashboard from '../components/dashboard'
import { DashboardModel } from '../components/dashboard-model'
import contentState from '../components/main-model'

const isServer = typeof window === 'undefined'

@inject('appState')
class DashboardWrapper extends React.Component {
  static async getInitialProps ({query, req}) {
    let dashboard = contentState.getDashboardById(query.id)

    if (isServer || !dashboard) {
      let response = await this.getDashboardInfo(query.id)
      let dashboardInfo = await response.json()

      dashboard = new DashboardModel({
        navData: dashboardInfo.navData,
        title: dashboardInfo.title,
        id: query.id,
        module: query.module,
        parameters: query.parameters
      })
    }

    return { dashboardData: mobx.toJS(dashboard) }
  }

  static getDashboardInfo (id) {
    return fetch(`http://localhost:3000/api/dashboard/${id}`)
  }

  initDashboardModel () {
    let {dashboardData, id, appState} = this.props
    this.dashboardModel = appState.getDashboardById(id)

    if (!this.dashboardModel) {
      this.dashboardModel = new DashboardModel(dashboardData)

      appState.newDashboard(id, this.dashboardModel)
    } else {
      this.dashboardModel.setState(dashboardData)
    }
  }

  updateDashboardModel ({ module: newModule, parameters: newParameters }) {
    this.dashboardModel.module = newModule
    this.dashboardModel.parameters = JSON.parse(newParameters)
  }

  parametersToUrlQuery (p) {
    return !p ? '' : Object.keys(p)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(p[key])}`)
      .join('&')
  }

  openContent (module, parameters) {
    const urlQuery = this.parametersToUrlQuery(parameters)
    const {id} = this.dashboardModel

    Router.push({
      pathname: '/dashboard',
      query: { id, module, parameters: JSON.stringify(parameters) }
    },
    `/d/${id}/${module || ''}${urlQuery ? `?${urlQuery}` : ''}`,
    {shallow: true})
  }

  constructor (props) {
    super(props)

    this.openContent = this.openContent.bind(this)

    this.initDashboardModel()
  }

  componentWillReceiveProps (nextProps) {
    this.updateDashboardModel(nextProps.router.query)
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
