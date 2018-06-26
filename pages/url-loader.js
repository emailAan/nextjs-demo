import css from 'styled-jsx/css'
import {withRouter} from 'next/router'

let iframe = css`
iframe {
        border: 0;
        min-width: calc(100% - 10px);
        min-height: calc(100% - 50px);
        bottom: 0px;
        position: absolute;
        overflow-x: hidden;
        overflow-y: hidden;
    }
`

export default withRouter((props) => (
  <div>
    <h1>{props.router.query.url}</h1>
    <iframe src={props.router.query.url} />
    <style jsx>{iframe}</style>
  </div>
))
