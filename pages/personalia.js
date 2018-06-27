import React, {Fragment} from 'react'
import css from 'styled-jsx/css'
import { withRouter } from 'next/router'

require('es6-promise').polyfill()
require('isomorphic-fetch')

let listviewStyle = css`
ul {
    color: #000;
}
`

let ListItem = ({label}) => (
  <Fragment>
    <li><span>{label}</span></li>
  </Fragment>
)

let ListView = (props) => (
  <div><ul>{props.children}</ul>
    <style jsx>{listviewStyle}</style>
  </div>
)

class Caseload extends React.Component {
  static async getInitialProps ({ req }) {
    let clientId = 4
    let response = await fetch(`http://localhost:8080/client?id=${clientId}`)
    let caseload = await response.json()

    return { caseload }
  }

  render () {
    return (
      <div>
        <h1>Home</h1>
        <p>Dit is de home page </p>
        <ListView>
          {this.props.caseload.map((c, i) => <ListItem key={i} label={c.firstName + ' ' + c.lastName} />)}
        </ListView>
      </div>
    )
  }
}

export default withRouter(Caseload)
