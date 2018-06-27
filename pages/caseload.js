import React, {Fragment} from 'react'
import Link from 'next/link'
import css from 'styled-jsx/css'
import { withRouter } from 'next/router'

require('es6-promise').polyfill()
require('isomorphic-fetch')

let listviewStyle = css`
ul {
    color: #000;
}
`

let ListItem = ({label, id}) => (
  <Fragment>
    <li><Link as={`personalia/${id}`} href={`personalia?id=${id}`} ><a>{label}</a></Link></li>
  </Fragment>
)

let ListView = (props) => (
  <div><ul>{props.children}</ul>
    <style jsx>{listviewStyle}</style>
  </div>
)

class Caseload extends React.Component {
  static async getInitialProps ({ req }) {
    let response = await fetch('http://localhost:8080/caseload')
    let caseload = await response.json()

    return { caseload }
  }

  render () {
    return (
      <div>
        <h1>Caseload</h1>
        <ListView>
          {this.props.caseload.map((c, i) => <ListItem key={i} id={c.id} label={c.firstName + ' ' + c.lastName} />)}
        </ListView>
      </div>
    )
  }
}

export default withRouter(Caseload)
