import React from 'react'
import Router, { withRouter } from 'next/router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

require('es6-promise').polyfill()
require('isomorphic-fetch')

let CaseloadListItem = ({label, id}) => (
  <ListItem divider button onClick={() => Router.push(`/personalia?id=${id}`, `/personalia/${id}`)}><ListItemText>{label}</ListItemText></ListItem>
)

let ListView = (props) => (
  <List>{props.children}</List>
)

class Caseload extends React.Component {
  static async getInitialProps ({ req }) {
    let response = await fetch(`http://${req ? 'api:8080' : 'api.localhost'}/caseload`)
    let caseload = await response.json()

    return { caseload }
  }

  render () {
    let {caseload} = this.props
    return (
      <div>
        <h1>Caseload</h1>
        <ListView>
          { caseload ? caseload.map((c, i) => <CaseloadListItem key={i} id={c.id} label={c.firstName + ' ' + c.lastName} />) : null }
        </ListView>
      </div>
    )
  }
}

export default withRouter(Caseload)
