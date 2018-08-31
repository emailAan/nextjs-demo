import React from 'react'
import PropTypes from 'prop-types'

import ModuleReact from '../../components/module-react'
import ModuleAdf from '../../components/module-adf'
import ModuleUrl from '../../components/module-url'
import ModuleNotAvailable from '../../components/module-not-available'

import {getModuleComponentUrl} from '../../utils/api'

class ModuleLoader extends React.Component {
  renderModule () {
    let {type, module} = this.props

    if (type === 'react') {
      return <ModuleReact {...this.props} customProps={this.props.customProps}
        location={getModuleComponentUrl(module)} />
    } else if (type === 'adf') {
      return <ModuleAdf {...this.props} customProps={this.props.customProps} />
    } else if (type === 'url') {
      return <ModuleUrl {...this.props} customProps={this.props.customProps} />
    } else if (type === 'mna') {
      return <ModuleNotAvailable {...this.props} />
    }
  }

  render () {
    return (
      <div>
        { this.renderModule() }
      </div>
    )
  }
}

ModuleLoader.propTypes = {
  title: PropTypes.string,
  module: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  customProps: PropTypes.object
}

export default ModuleLoader
