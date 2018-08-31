import Main from '../containers/main'
import { Link } from '../utils/routes'

export default () => (
  <Main
    navigationItems={null}
    contentTitle='Welkom bij Avinty POC-app'
    content={(
      <ul>
        <li><Link route='selectie'><a>Selecteer een dashboard</a></Link></li>
        <li><Link route='/d/4H7V9A2S'><a>Of ga naar jouw dash</a></Link></li>
      </ul>
    )} />
)
