import React from 'react'
import {withRouter} from 'next/router'
import { connect } from 'react-redux'

import Dashboard from '../containers/dashboard/dashboard'
import {initDashboard, setModule} from '../containers/dashboard/actions'
import {newDashboard} from '../containers/main/actions'
import {getDashboardById} from '../containers/main/selectors'

import {convertParameters, isServer} from '../utils'
import {getModuleApiUrl, apiBaseUrl} from '../utils/api'
import {openModule} from '../utils/routes'

class DashboardWrapper extends React.Component {
  static async getInitialProps ({store, query, req}) {
    let dashboard = getDashboardById(store.getState(), query.id)

    if (isServer || !dashboard) {
      let response = await this.getDashboardInfo(query.id)
      let dashboardInfo = await response.json()
      dashboard = {
        navData: dashboardInfo.navData,
        title: dashboardInfo.title,
        id: query.id,
        module: query.module,
        moduleParameters: convertParameters(query)
      }

      store.dispatch(newDashboard(dashboard))
    }

    if (dashboard.module) {
      const res = await fetch(getModuleApiUrl(dashboard.module))
      const moduleMetaData = await res.json()

      dashboard = {...dashboard,
        moduleMetaData}
    } else {
      dashboard = {...dashboard,
        module: null,
        moduleMetaData: null,
        moduleParameters: null}
    }

    store.dispatch(initDashboard(dashboard))

    return { }
  }

  static getDashboardInfo (id) {
    return fetch(`${apiBaseUrl}/dashboard/${id}`)
  }

  async updateDashboard (newModule, parameters) {
    if (!newModule) {
      this.props.setModule()
    } else if (this.props.dashboard.module !== newModule) {
      const res = await fetch(getModuleApiUrl(newModule))
      const moduleMetaData = await res.json()

      this.props.setModule(newModule, moduleMetaData, parameters)
    }
  }

  openContent (module, parameters) {
    const {id} = this.props.dashboard

    // update location
    openModule(id, module, parameters)
    // update store
    this.updateDashboard(module, parameters ? convertParameters(parameters) : null)
  }

  constructor (props) {
    super(props)
    this.openContent = this.openContent.bind(this)
  }

  render () {
    return <Dashboard openContent={this.openContent} />
  }
}

const mapStateToProps = state => {
  return { dashboard: state.dashboard }
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
