import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import ModuleReact from '../../components/module-react'
import ModuleAdf from '../../components/module-adf'
import ModuleUrl from '../../components/module-url'

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
    }
  }

  render () {
    let {title} = this.props
    return (
      <div>
        <Typography variant='headline' gutterBottom>{title}</Typography>
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
