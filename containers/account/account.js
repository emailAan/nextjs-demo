import { connect } from 'react-redux'
import {decodeJwt} from '../../utils/auth'

const Account = (props) => {
  const {username, name, id} = decodeJwt(props.authData.token)
  return <div>{`${username}-${name}-${id}`}</div>
}

const mapStateToProps = state => {
  return { authData: state.main.authData }
}

export default connect(
  mapStateToProps
)(Account)
