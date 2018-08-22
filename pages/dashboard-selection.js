import Link from 'next/link'

export default () => (
  <div>
    <h1>Selecteer een dashboard</h1>
    <ul>
      <li><Link
        as={`/d/4H7V9A2S?c=4&m=0&i=1`}
        href={{
          pathname: '/dashboard',
          query: { medewerker: 0, client: 4, inschrijving: 1, dashboard: 12, id: '4H7V9A2S' }
        }}><a>medewerker</a></Link></li>
      <li><Link
        as={`/d/3JHD4GT5?c=15&m=3&i=1`}
        href={{
          pathname: '/dashboard',
          query: { medewerker: 3, client: 15, inschrijving: 1, dashboard: 1, id: '3JHD4GT5' }
        }}><a>client</a></Link></li>
    </ul>
  </div>
)
