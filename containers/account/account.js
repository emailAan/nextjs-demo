import { connect } from 'react-redux'

import {getJwtData} from './actions'

const Account = (props) => {
  const {username, name, id} = getJwtData(props.authData.token)
  return <div>{`${username}-${name}-${id}`}</div>
}

const mapStateToProps = state => {
  return { authData: state.main.authData }
}

const mapDispatchToProps = {
  getJwtData: (jwt) => {
    return getJwtData(jwt)
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Account)
