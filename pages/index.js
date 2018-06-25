import Link from 'next/link'

const NOS = 'http://www.nos.nl'

export default () => (
  <div>
    <h1>Welcome</h1>
    <p>Welcome to next.js!</p>
    <ul>
      <li><Link href='/home'><a>Home</a></Link></li>
      <li><Link as={`u/nos`} href={`/url-loader?url=${NOS}`}><a>NOS</a></Link></li>
      <li><Link as={`u/nu`} href={`/url-loader?url=${'http://www.nu.nl'}`}><a>NU</a></Link></li>
    </ul>
  </div>
)
