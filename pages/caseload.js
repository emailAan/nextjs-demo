import React from 'react'
import Router, { withRouter } from 'next/router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

let CaseloadListItem = ({label, id}) => (
  <ListItem divider button onClick={() => Router.push(`/personalia?id=${id}`, `/personalia/${id}`)}><ListItemText>{label}</ListItemText></ListItem>
)

let ListView = (props) => (
  <List>{props.children}</List>
)

const renderCaseloadItem = (c, i) => <CaseloadListItem
  key={i} id={c.id}
  label={`${c.firstName} ${c.lastName}`} />

class Caseload extends React.Component {
  static async getInitialProps ({ req }) {
    let response = await fetch(`http://${req ? 'api:8080' : 'api.localhost'}/caseload`)
    let caseload = await response.json()

    return { caseload }
  }

  render () {
    let {caseload} = this.props
    return (
      <React.Fragment>
        <Typography variant='headline' gutterBottom>Caseload</Typography>
        <ListView>
          { caseload ? caseload.map(renderCaseloadItem) : null }
        </ListView>
      </React.Fragment>
    )
  }
}

export default withRouter(Caseload)
