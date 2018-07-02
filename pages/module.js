import React from 'react'
import ReactDOM from 'react-dom'
import {withRouter} from 'next/router'

export default withRouter(
  class extends React.Component {
    constructor (props) {
      super(props)
      this.mountPointRef = React.createRef()
    }

    async mountModule () {
      const node = this.mountPointRef.current
      const importedModule = await window.SystemJS.import('/modules/agenda/agenda.js')
      const Comp = importedModule.default

      ReactDOM.render(<Comp customProps={{}} />, node)
    }

    componentDidMount () {
      this.mountModule()
    }

    componentWillUnmount () {
      ReactDOM.unmountComponentAtNode(this.mountPointRef.current)
    }

    render () {
      return (
        <div>
          <h1>{this.props.router.query.id}</h1>
          <div ref={this.mountPointRef} />
        </div>
      )
    }
  }

)
