import {Component, Fragment} from 'react'

class DevToolsWrapper extends Component {
  componentDidMount () {
    const DevTools = require('mobx-react-devtools').default
    this.setState({ devTools: DevTools })
  }

  state = {};

  render () {
    const { devTools: DevTools } = this.state
    return <Fragment> {DevTools && <DevTools {...this.props} />}</Fragment>
  }
}

export default DevToolsWrapper
