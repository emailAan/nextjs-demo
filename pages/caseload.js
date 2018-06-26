import React, {Fragment} from 'react'
import css from 'styled-jsx/css'
import { withRouter } from 'next/router'

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
//   static async getInitialProps ({ req }) {
//     let response = await fetch('http://localhost:8080/api/caseload')
//     let navData = await response.json()

//     return { navData }
//   }

  render () {
    return (
      <div>
        <h1>Home</h1>
        <p>Dit is de home page </p>
        <ListView>
          <ListItem label='Brandsteder' />
          <ListItem label='Atsma' />
        </ListView>
      </div>
    )
  }
}

export default withRouter(Caseload)
