import {Link} from '../utils/routes'

export default () => (
  <div>
    <h1>Selecteer een dashboard</h1>
    <ul>
      <li><Link route={'dashboard'} params={{id: '4H7V9A2S'}}><a>medewerker</a></Link></li>
      <li><Link route={'dashboard'} params={{id: '3JHD4GT5'}}><a>client</a></Link></li>
    </ul>
  </div>
)
