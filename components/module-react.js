import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

class ModuleReact extends React.Component {
  constructor (props) {
    super(props)
    this.mountPointRef = React.createRef()
  }

  async mountModule () {
    const node = this.mountPointRef.current
    const importedModule = await window.SystemJS.import(this.props.location)
    const Comp = importedModule.default

    ReactDOM.render(<Comp {...this.props.customProps} />, node)
  }

  unmountModule () {
    ReactDOM.unmountComponentAtNode(this.mountPointRef.current)
  }

  componentDidMount () {
    this.mountModule()
  }

  componentWillUnmount () {
    this.unmountModule()
  }

  componentDidUpdate () {
    this.unmountModule()
    this.mountModule()
  }

  render () {
    return (
      <div ref={this.mountPointRef} />
    )
  }
}
ModuleReact.propTypes = {
  location: PropTypes.string.isRequired,
  title: PropTypes.string,
  customProps: PropTypes.object
}

export default ModuleReact
