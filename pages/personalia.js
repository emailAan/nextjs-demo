import React from 'react'
import {withRouter} from 'next/router'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

require('es6-promise').polyfill()
require('isomorphic-fetch')

class Personalia extends React.Component {
  static async getInitialProps ({query}) {
    let response = await fetch(`http://localhost:8080/personalia/${query.id}`)
    let personalia
    try {
      personalia = (response) ? await response.json() : null
    } catch (ee) {
      personalia = {lastName: '', firstName: ''}
    }

    return { personalia }
  }

  constructor (props) {
    super(props)
    this.state = {personalia: this.props.personalia}

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
    this.handleChangeLastName = this.handleChangeLastName.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.save = this.save.bind(this)
  }

  handleChangeFirstName (event) {
    let personalia = this.state.personalia
    personalia.firstName = event.target.value
    this.setState({...this.state, personalia})
  }

  handleChangeLastName (event) {
    let personalia = this.state.personalia
    personalia.lastName = event.target.value
    this.setState({...this.state, personalia})
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  save () {
    fetch('http://localhost:8080/personalia/',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(this.state.personalia)
      })
      .then(function (res) { console.log(res) })
      .catch(function (res) { console.log(res) })
  }
  render () {
    return (
      <div>
        <h1>Personalia: {this.props.personalia.firstName}</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label='Voornaam'
            type='text' value={this.state.personalia.firstName} onChange={this.handleChangeFirstName} />
          <br />
          <TextField
            label='Achternaam'
            type='text' value={this.state.personalia.lastName} onChange={this.handleChangeLastName} />
          <br />
          <br />
          <Button variant='contained' color='primary' onClick={this.save}>Opslaan</Button>
        </form>

      </div>
    )
  }
}

export default withRouter(Personalia)
