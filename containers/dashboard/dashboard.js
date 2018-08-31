import React from 'react'
import { connect } from 'react-redux'

import ModuleLoader from '../module/module-loader'

class Dashboard extends React.Component {
  getContainerContent () {
    const { module: m, moduleParameters, moduleMetaData } = this.props.dashboard

    return m
      ? <ModuleLoader
        type={moduleMetaData.type}
        id={moduleMetaData.id}
        customProps={moduleParameters}
        title={moduleMetaData.label}
        module={m} />
      : null
  }

  render () {
    return (
      <main style={{ flexGrow: 1 }}>
        {this.getContainerContent()}
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.dashboard
  }
}
export default connect(
  mapStateToProps
)(Dashboard)
