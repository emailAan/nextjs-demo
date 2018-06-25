import {withRouter} from 'next/router'

export default withRouter((props) => (
  <div>
    <h1>{props.router.query.url}</h1>
    <iframe src={props.router.query.url} />
    <style jsx>
      {`
    iframe {
        border: 0;
        min-width: calc(100% - 10px);
        min-height: calc(100% - 50px);
        bottom: 0px;
        position: absolute;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    `}
    </style>
  </div>
))
