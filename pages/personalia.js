import React from 'react'
import {withRouter} from 'next/router'

class Personalia extends React.Component {
  static async getInitialProps ({query}) {
    let response = await fetch(`http://localhost:8080/personalia/${query.id}`)
    let personalia
    try {
      personalia = (response) ? await response.json() : null
    } catch (ee) {
      personalia = {}
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
    console.log('saving to api: ', JSON.stringify(this.state.personalia))

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
          <label>
          voornaam
            <input type='text' value={this.state.personalia.firstName} onChange={this.handleChangeFirstName} />
          </label>
          <br />
          <label>
          achternaam
            <input type='text' value={this.state.personalia.lastName} onChange={this.handleChangeLastName} />
          </label>
          <br />
          <br />
          <input type='submit' value='Submit' onClick={this.save} />
        </form>

      </div>
    )
  }
}

export default withRouter(Personalia)
