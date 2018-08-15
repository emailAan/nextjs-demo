import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

const NOS = 'http://www.nos.nl'

export default () => (
  <div>
    <Typography variant='headline' gutterBottom>Welkom bij Avinty POC-app</Typography>
    <ul>
      <li><Link href='/home'><a>Home</a></Link></li>
      <li><Link href='/caseload'><a>Caseload</a></Link></li>
      <li><Link href='/dashboard?id=4H7V9A2S'><a>dashboard</a></Link></li>
      <li><Link as={`u/nos`} href={`/url-loader?url=${NOS}`}><a>NOS</a></Link></li>
      <li><Link as={`u/nu`} href={`/url-loader?url=${'http://www.nu.nl'}`}><a>NU</a></Link></li>
    </ul>
  </div>
)
