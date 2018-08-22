import React, {Fragment} from 'react'
import css from 'styled-jsx/css'
import { connect } from 'react-redux'

let contentCss = css`
div.content  {
    position: absolute;
    left: 150px;
    right:0px;
    top: 65px;
    padding-left: 5px;
}
`

let headerCss = css`
div.top {
    position: absolute;
    left: 150px;
    top: 0px;
    right:0px;
    height: 60px;
    padding-left: 5px;
    background-color: #5c646c;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
}
span.brandTitle {
  font-size: 46px;
}
`
const Header = ({title, subTitle}) => (
  <Fragment>
    <div className='top'>
      <span className='brandTitle' >{`${title}`}</span>
      <span>{subTitle}</span>
    </div>
    <style jsx>{headerCss}</style>
  </Fragment>
)

const ContentWrapper = ({contentChildren}) => (
  <Fragment>
    <div className='content'>
      {contentChildren}
    </div>
    <style jsx>{contentCss}</style>
  </Fragment>
)

const Main = ({content, title, subTitle}) => {
  return (
    <Fragment>
      <Header title={title} subTitle={subTitle} />
      <ContentWrapper contentChildren={content} />
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    title: state.main.title,
    subTitle: state.main.subTitle
  }
}

export default connect(mapStateToProps)(Main)
