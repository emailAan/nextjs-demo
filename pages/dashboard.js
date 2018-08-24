import React from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'

import Dashboard from '../containers/dashboard/dashboard'
import { initDashboard, setModule } from '../containers/dashboard/actions'
import { newDashboard } from '../containers/main/actions'
import { getDashboardById } from '../containers/main/selectors'

import { convertParameters, isServer } from '../utils'
import { getModuleApiUrl, apiBaseUrl } from '../utils/api'
import { openModule } from '../utils/routes'

async function getDashboardInfo (id) {
  const res = await fetch(`${apiBaseUrl}/dashboard/${id}`)

  return (res.status === 200) ? res.json() : new Promise((resolve, reject) => resolve({}))
}

async function getModuleInfo (module) {
  const res = await fetch(getModuleApiUrl(module))

  return (res.status === 200) ? res.json() : new Promise((resolve, reject) => resolve({}))
}

class DashboardWrapper extends React.Component {
  static async getInitialProps ({ store, query, req }) {
    let dashboard = getDashboardById(store.getState(), query.id)

    if (isServer || !dashboard) {
      let dashboardInfo = await getDashboardInfo(query.id)

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
      const moduleMetaData = await getModuleInfo(dashboard.module)

      dashboard = {
        ...dashboard,
        moduleMetaData
      }
    } else {
      dashboard = {
        ...dashboard,
        module: null,
        moduleMetaData: null,
        moduleParameters: null
      }
    }

    store.dispatch(initDashboard(dashboard))

    return {}
  }

  async updateDashboard (newModule, parameters) {
    if (!newModule) {
      this.props.setModule()
    } else if (this.props.dashboard.module !== newModule) {
      const moduleMetaData = await getModuleInfo(newModule)

      this.props.setModule(newModule, moduleMetaData, parameters)
    }
  }

  openContent (module, parameters) {
    const { id } = this.props.dashboard

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
