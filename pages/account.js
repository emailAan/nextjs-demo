import Main from '../containers/main'
import { connect } from 'react-redux'

const Account = (props) => {
  const {username, name, id} = props.authData
  return <Main
    contentTitle='Mijn gegevens'
    content={`${username}-${name}-${id}`}
  />
}

const mapStateToProps = state => {
  return { authData: state.main.authData }
}
export default connect(
  mapStateToProps
)(Account)
