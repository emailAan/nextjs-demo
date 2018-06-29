import React, {Component} from 'react'
import {connect} from 'react-redux'

class Page extends Component {
  static getInitialProps ({store, isServer, pathname, query}) {
    store.dispatch({type: 'INCREASE'})

    return {custom: 'custom'}
  }
  render () {
    return (
      <div>
        <div>Props {JSON.stringify(this.props)}</div>
        <a onClick={this.props.increase}>increase counter</a>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { counter } = state
  return { counter }
}

const mapDispatchToProps = (dispatch) => ({
  increase () { dispatch({type: 'INCREASE'}) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
