import React from 'react'
import PropTypes from 'prop-types'

import Iframe from './iframe'
import {parametersToCustomStringFormat} from '../utils'
import {getModuleBaseUrl} from '../utils/api'

class ModuleAdf extends React.Component {
  constructor (props) {
    super(props)
    this.state = {url: null}
  }

  componentDidMount () {
    this.fetchAdfSsoUrl(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.fetchAdfSsoUrl(nextProps)
  }

  async fetchAdfSsoUrl (props) {
    const {client, inschrijving} = props.customProps
    let paramsString = parametersToCustomStringFormat(props.customProps)

    const response = await fetch(`${getModuleBaseUrl('sso')}/sso?client=${client}&volgnummer=${inschrijving}&params=${paramsString}&module=${props.id}`)
    const url = await response.text()
    this.setState({...this.state, url})
  }

  render () {
    return (
      <div>
        { this.state.url ? <Iframe maxHeight maxWidth url={this.state.url} /> : null }
      </div>
    )
  }
}
ModuleAdf.propTypes = {
  id: PropTypes.number.isRequired,
  customProps: PropTypes.object
}

export default ModuleAdf
