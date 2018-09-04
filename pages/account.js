import Main from '../containers/main'

import Account from '../containers/account'

const AccountPage = (props) => {
  return <Main
    contentTitle='Mijn gegevens'
    content={<Account />}
  />
}

export default AccountPage
