import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

export default () => (
  <div>
    <Typography variant='headline' gutterBottom>Welkom bij Avinty POC-app</Typography>
    <ul>
      <li><Link href='/dashboard-selection'><a>Selecteer een dashboard</a></Link></li>
      <li><Link href='/dashboard?id=4H7V9A2S'><a>Of ga naar jouw dash</a></Link></li>
    </ul>
  </div>
)
