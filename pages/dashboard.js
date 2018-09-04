import React, {Fragment} from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'

import Main from '../containers/main'
import Dashboard from '../containers/dashboard/dashboard'
import { initDashboard, setModule } from '../containers/dashboard/actions'
import { newDashboard } from '../containers/main/actions'
import { getDashboardById } from '../containers/main/selectors'
import NavigationItem from '../components/navigation-item'
import {withApiContext} from '../components/api-context'

import { convertParameters, isServer } from '../utils'
import { getModuleApiUrl, apiBaseUrl } from '../utils/api'
import { openModule } from '../utils/routes'

async function getDashboardInfo (apiCtx, id, jwt) {
  const res = await apiCtx.apiGet(`${apiBaseUrl}/dashboard/${id}`, jwt)

  return (res.status === 200) ? res.json() : new Promise((resolve, reject) => resolve({}))
}

async function getModuleInfo (apiCtx, module, jwt) {
  const res = await apiCtx.apiGet(getModuleApiUrl(module), jwt)

  return (res.status === 200) ? res.json() : new Promise((resolve, reject) => resolve(null))
}

class Dash extends React.Component {
  static async getInitialProps ({ store, query, req, apiCtx }) {
    console.log('apiCtx: ', apiCtx)

    let dashboard = getDashboardById(store.getState(), query.id)

    if (isServer || !dashboard) {
      dashboard = await Dash.createDashboardDataFromQuery(apiCtx, query, dashboard, store)
    }

    store.dispatch(initDashboard(dashboard))

    return {}
  }

  static async getModule (apiCtx, module, parameters, token) {
    const moduleMetaData = module ? await getModuleInfo(apiCtx, module, token) : null
    const moduleParameters = module ? convertParameters(parameters) : null

    return moduleMetaData
      ? {
        module,
        moduleParameters,
        moduleMetaData
      }
      : {
        module,
        moduleTitle: 'Module ' + module,
        moduleParameters,
        moduleMetaData: {
          label: 'Module ' + module,
          id: module,
          type: 'mna'
        }
      }
  }

  static async createDashboardDataFromQuery (apiCtx, query, dashboard, store) {
    const token = store.getState().main.authData.token
    let dashboardInfo = await getDashboardInfo(apiCtx, query.id, token)
    dashboard = {
      navData: dashboardInfo.navData,
      title: dashboardInfo.title,
      id: query.id,
      ...await Dash.getModule(apiCtx, query.module, query, token)
    }
    store.dispatch(newDashboard(dashboard))

    return dashboard
  }

  async updateDashboard (newModule, parameters, moduleTitle) {
    if (!newModule) {
      this.props.setModule()
    } else if (this.props.dashboard.module !== newModule) {
      const module = await Dash.getModule(this.props.apiCtx, newModule, parameters, this.props.token)

      this.props.setModule(newModule, module.moduleMetaData, module.moduleParameters, moduleTitle)
    }
  }

  openContent (module, parameters, title) {
    const { id } = this.props.dashboard

    // update location
    openModule(id, module, parameters)
    // update store
    this.updateDashboard(module, parameters ? convertParameters(parameters) : null, title)
  }

  renderItems () {
    let {navData} = this.props.dashboard
    console.log(this.props)
    return (
      <Fragment>
        <ListItem button onClick={() => this.openContent()}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        {
          navData ? navData.map((item, i) => (
            <NavigationItem
              key={i}
              action={() => this.openContent(item.id, item.parameters, item.label)}
              item={item} />
          ))
            : null
        }
      </Fragment>
    )
  }

  constructor (props) {
    super(props)
    this.openContent = this.openContent.bind(this)
  }

  render () {
    return <Main
      navigationItems={this.renderItems()}
      contentTitle={this.props.dashboard.moduleTitle}
      content={(
        <Dashboard />
      )} />
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
    token: state.main.authData.token
  }
}

const mapDispatchToProps = {
  setModule: (module, moduleMetaData, moduleParameters, moduleTitle) => {
    return setModule(module, moduleMetaData, moduleParameters, moduleTitle)
  }
}

export default
withApiContext(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Dash)
  )
)
