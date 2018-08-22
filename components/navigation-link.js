import {Fragment} from 'react'
import css from 'styled-jsx/css'

const navLinkStyle = css`
li:hover {
    background-color: #4b555f;
}      
li {
    padding-top: 14px;
    padding-bottom: -14px;
    padding-left: 10px;
    padding-right: 10px;
    height: 100%;
}      
li.second {
    background-color: #4b555f;
}      
li.second:hover {
    background-color: #36404d;
}      
li:hover {
    color: black;
}      
a {
    height: 100%;
    text-decoration: none;
    color: white;
}      
`

const NavLink = ({entry, lvl, action, selected}) => (
  <Fragment>
    <a onClick={action}>
      <li style={selected ? {fontStyle: 'italic'} : {}} className={lvl > 1 ? 'second' : ''} >
        <span>{entry.label}</span>
        {entry.counter ? <span className='counter' >{entry.counter}</span> : null }
      </li>
    </a>
    <style jsx>{navLinkStyle}</style>
  </Fragment>
)

export default NavLink
