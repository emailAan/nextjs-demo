import React, {Fragment} from 'react'
import css from 'styled-jsx/css'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

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

const Content = ({contentChildren}) => (
  <Fragment>
    <div className='content'>
      {contentChildren}
    </div>
    <style jsx>{contentCss}</style>
  </Fragment>
)

export default ({content}) => {
  return (
    <Fragment>
      <Header title='Avinty' subTitle='ZORGVERNIEUWERS NET ALS JIJ' />
      <Content contentChildren={content} />
    </Fragment>
  )
}
