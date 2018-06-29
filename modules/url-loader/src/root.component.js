
import React from 'react'

class Iframe extends React.Component {
  render () {
    return (
      <iframe
        {...this.props}
        frameBorder={'0'}
        width={'100%'}
        height={'100%'}
        className='content'
      />
    )
  }
}

function fetchRedirectUrl (url, callback) {
  window.fetch(url).then(res => res.text()).then(url => callback(url))
}

export default class Root extends React.Component {
  constructor (props) {
    super(props)
    this.state = {redirectUrl: ''}
  }

  componentDidCatch (error, info) {
    console.log(error, info)
  }

  fetchRedirectUrl (url, callback) {
    window.fetch(url).then(res => res.text()).then(url => callback(url))
  }

  componentDidMount () {
    this.fetchRedirectUrl(this.props.customProps.url, (redirectUrl) => {
      this.setState({
        ...this.state,
        redirectUrl: redirectUrl })
    })
  }

  render () {
    let {title} = this.props.customProps
    let {redirectUrl} = this.state

    return <Iframe title={title} src={redirectUrl} />
  }
}
