import {Fragment} from 'react'
import css from 'styled-jsx/css'

let headerCss = css`
div.top {
    height: 40px;
    padding-left: 5px;
    margin-right: 5px;
    background-color: #5c646c;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    display:flex;
}
.top > .middle {
    margin:2px;
}
`

const Header = ({left, middle, right}) => (
  <Fragment>
    <div className='top'>
      <div className='left'>
        {left}
      </div>
      <div className='middle'>
        {middle}
      </div>
      <div className='right'>
        {right}
      </div>
    </div>
    <style jsx>{headerCss}</style>
  </Fragment>
)

export default Header
