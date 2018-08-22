import React from 'react'

export default class Root extends React.Component {
  componentDidCatch (error, info) {
    console.log(error, info)
  }

  render () {
    return (
      <div>
        <span>Agenda van {this.props.client}</span>
      </div>
    )
  }
}
