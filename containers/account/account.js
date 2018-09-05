import React from 'react'
import { connect } from 'react-redux'

import {getAccountInfo} from './actions'
import {withApiContext} from '../../components/api-context'
// import {decodeJwt} from '../../utils/auth'

class Account extends React.Component {
  componentDidMount () {
    this.props.getAccountInfo(this.props.apiCtx)
  }

  render () {
    const {username, name, id} = this.props.account
    return <div>{`${username}-${name}-${id}`}</div>
  }
}

// const Account = (props) => {
//   const {username, name, id} = decodeJwt(props.authData.token)
//   return <div>{`${username}-${name}-${id}`}</div>
// }

const mapStateToProps = state => {
  return { account: state.account }
}

const mapDispatchToProps = {
  getAccountInfo: (apiCtx) => {
    return getAccountInfo(apiCtx)
  }
}

export default withApiContext(
  connect(
    mapStateToProps, mapDispatchToProps
  )(Account)
)
