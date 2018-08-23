import {Fragment} from 'react'
import css from 'styled-jsx/css'

const navItemStyle = css`
li:hover {
    background-color: #4b555f;
}      
li {
    padding: 5px;
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

const NavItem = ({item, lvl, action, selected}) => (
  <Fragment>
    <a onClick={action}>
      <li style={selected ? {fontStyle: 'italic'} : {}} className={lvl > 1 ? 'second' : ''} >
        <span>{item.label}</span>
        {item.counter ? <span className='counter' >{item.counter}</span> : null }
      </li>
    </a>
    <style jsx>{navItemStyle}</style>
  </Fragment>
)

export default NavItem
