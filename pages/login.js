import {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {apiBaseUrl} from '../utils/api'
import { stringify } from 'querystring'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  async handleLogin (event) {
    const url = `${apiBaseUrl}/auth/login`

    const data = new URLSearchParams()
    data.append('username', this.state.username)
    data.append('password', this.state.password)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: data
    })

    const tokenReply = await res.json()
    console.log(tokenReply)
  }

  render () {
    return (
      <div>
        {/* <AppBar
          title='Login' >
          <h1>Avinty</h1>
        </AppBar> */}
        <TextField
          placeholder='Enter your Username'
          label='Username'
          onChange={(event) => this.setState({username: event.target.value})}
        />
        <br />
        <TextField
          id='password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
          margin='normal'
          onChange={(event) => this.setState({password: event.target.value})}
        />
        <br />
        <Button variant='contained' color='primary' style={style} onClick={(event) => this.handleLogin(event)} >login</Button>
      </div>
    )
  }
}
const style = {
  margin: 15
}
