import React, {Fragment} from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import NavigationBar, {NavigationLink} from '../../components/navigation-bar'
import DashboardHeader from '../../components/dashboard-header'
import ModuleLoader from '../module/module-loader'

const Container = ({children}) => <div>{children}</div>

const Title = ({value}) => <span style={{fontSize: '26px'}} >{value}</span>

const Brand = () => <img src='/brandImage.png' />

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.swithDashboard = this.swithDashboard.bind(this)
    this.gotoDashboardHome = this.gotoDashboardHome.bind(this)
  }

  swithDashboard () {
    Router.push('/dashboard-selection', '/')
  }

  gotoDashboardHome () {
    this.props.openContent(null)
  }

  getContainerContent () {
    const { module: m, title, moduleParameters, moduleMetaData } = this.props.dashboard
    return m
      ? <ModuleLoader
        type={moduleMetaData.type}
        id={moduleMetaData.id}
        customProps={moduleParameters}
        title={title}
        module={m} />
      : null
  }

  render () {
    const { title, module, navData } = this.props.dashboard
    return (
      <Fragment>
        <NavigationBar
          currentModule={module}
          navData={navData}
          openContent={this.props.openContent}
          stickyItems={(
            <Fragment>
              <NavigationLink entry={{label: 'Dashboard'}} action={this.swithDashboard} lvl={1} />
              <NavigationLink entry={{label: 'Home'}} action={this.gotoDashboardHome} lvl={1} />
              <br />
            </Fragment>
          )}
        />
        <DashboardHeader
          left={(
            <Brand />
          )}
          middle={(
            <Title value={title} />
          )} />
        <Container>
          {this.getContainerContent()}
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard,
    subTitle: state.main.subTitle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    destroyTodo: () =>
      dispatch({
        type: 'DESTROY_TODO'
      })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
