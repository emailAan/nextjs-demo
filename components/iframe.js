import React from 'react'
import css from 'styled-jsx/css'
import throttle from 'lodash/throttle'

let iframeCss = css`
iframe {
  border: 0;
  position: relative;
}
`
class UrlLoader extends React.Component {
  constructor () {
    super()

    this.state = { height: 5000 }
    this.throttledUpdateDimensions = throttle(this.updateDimensions.bind(this), 100)
    this.iframeRef = React.createRef()
    this.iframeLoaded = this.iframeLoaded.bind(this)
  }

  getHeight (w, d) {
    let documentElement = d.documentElement || {}
    let body = d.getElementsByTagName('body')[0] || {}
    let height = w.innerHeight || documentElement.clientHeight || body.clientHeight

    return height
  }

  updateDimensions () {
    let height = this.getHeight(window || {}, document || {})

    let iframe = this.iframeRef.current
    let rect = iframe.getBoundingClientRect()

    this.setState({...this.state, height: height - rect.top - 10})
  }

  iframeLoaded () {
    var iframe = this.iframeRef.current

    if (iframe && this.props.iframeContentHeight) {
      try {
        let height = this.getHeight(iframe.contentWindow, iframe.contentWindow.document)
        iframe.height = height + 'px'
      } catch (error) {
        // DOMException: Blocked a frame with origin "" from accessing a cross-origin frame.
        iframe.height = '5000px'
      }
    }
  }

  componentDidMount () {
    if (this.props.maxHeight) {
      window.addEventListener('resize', this.throttledUpdateDimensions)
      this.updateDimensions()
    }
    if (this.props.iframeContentHeight) {
      var iframe = this.iframeRef.current
      iframe.addEventListener('load', this.iframeLoaded)
    }
  }

  componentWillUnmount () {
    if (this.props.maxHeight) {
      window.removeEventListener('resize', this.throttledUpdateDimensions)
    }
    if (this.props.iframeContentHeight) {
      var iframe = this.iframeRef.current
      iframe.removeEventListener('load', this.iframeLoaded)
    }
  }

  render () {
    let { width, height, maxWidth, maxHeight, url } = this.props
    width = !width && !maxWidth ? '300px' : width
    height = !height && !maxHeight ? '200px' : height

    return (
      <div>
        <iframe ref={this.iframeRef} onLoad={this.iframeLoaded} src={url} />
        <style jsx>{iframeCss}</style>
        <style jsx>{`
          iframe { 
            ${height ? 'height: ' + height + ';' : ''}
            ${maxWidth ? 'min-width: calc(100% - 10px);' : ''}
            ${!maxWidth ? 'width:' + width + ';' : ''};
            ${maxHeight ? 'height: ' + this.state.height + 'px;' : ''}
          }
        `}</style>
      </div>
    )
  }
}

export default UrlLoader
