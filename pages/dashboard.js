import React from 'react'
import Router, {withRouter} from 'next/router'
import { connect } from 'react-redux'

import Dashboard from '../containers/dashboard/dashboard'
import {initDashboard, setModule} from '../containers/dashboard/actions'
import {newDashboard} from '../containers/main/actions'
import {stringifyParameters, parametersToUrlQuery, convertParameters} from '../utils'
import {getDashboardById} from '../containers/main/selectors'

const isServer = typeof window === 'undefined'

class DashboardWrapper extends React.Component {
  static async getInitialProps ({reduxStore, query, req}) {
    let dashboard = getDashboardById(reduxStore.getState(), query.id)
    console.log(query.id, dashboard)
    if (isServer || !dashboard) {
      let response = await this.getDashboardInfo(query.id)
      let dashboardInfo = await response.json()
      let dashboard = {
        navData: dashboardInfo.navData,
        title: dashboardInfo.title,
        id: query.id,
        module: query.module,
        parameters: convertParameters(query.parameters)
      }

      reduxStore.dispatch(newDashboard(dashboard))
    }

    reduxStore.dispatch(initDashboard(dashboard))

    return { }
  }

  static getDashboardInfo (id) {
    return fetch(`http://localhost/api/dashboard/${id}`)
  }

  async updateDashboard (newModule, parameters) {
    if (!newModule) {
      this.props.setModule()
    } else if (this.props.dashboard.module !== newModule) {
      const res = await fetch(`http://localhost/api/modules/${newModule}`)
      const moduleMetaData = await res.json()

      this.props.setModule(newModule, moduleMetaData, parameters)
    }
  }

  openContent (module, parameters) {
    if (!module) {
      this.updateDashboard(null, null)
    }

    const urlQuery = parametersToUrlQuery(parameters)
    const {id} = this.props.dashboard

    Router.push({
      pathname: '/dashboard',
      query: { id, module, parameters: stringifyParameters(parameters) }
    },
    `/d/${id}/${module || ''}${urlQuery ? `?${urlQuery}` : ''}`,
    {shallow: true})

    this.updateDashboard(module, convertParameters(parameters))
  }

  constructor (props) {
    super(props)

    this.openContent = this.openContent.bind(this)
  }

  render () {
    return (
      <Dashboard openContent={this.openContent} />
    )
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard
  }
}

const mapDispatchToProps = {
  setModule: (module, moduleMetaData, moduleParameters) => {
    return setModule(module, moduleMetaData, moduleParameters)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardWrapper))
