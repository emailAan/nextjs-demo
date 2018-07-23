import React, {Fragment} from 'react'
import Router from 'next/router'
import css from 'styled-jsx/css'

const navBarStyle = css`
/* width */
div.navbar::-webkit-scrollbar {
    width: 10px;
}
/* Track */
div.navbar::-webkit-scrollbar-track {
    background: #5c646c; 
}
/* Handle */
div.navbar::-webkit-scrollbar-thumb {
    background: #4b555f; 
}
/* Handle on hover */
div.navbar::-webkit-scrollbar-thumb:hover {
    background: #555; 
}

.navbar {
  font-family: Arial, Helvetica, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #5c646c;
  color: white;
  font-size: 14px;
  font-weight: bold;
  width: 150px;
  height: 100%;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
}

.navbar ul {
  align-items: center;
  list-style-type: none;
  padding: 0;
}
`

const navBarItemStyle = css`
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

let NavLink = ({entry, lvl, action}) => (
  <Fragment>
    <a onClick={action}>
      <li className={lvl > 1 ? 'second' : ''} >
        <span>{entry.label}</span>
        {entry.counter ? <span className='counter' >{entry.counter}</span> : null }
      </li>
    </a>
    <style jsx>{navBarItemStyle}
    </style>
  </Fragment>
)

class Navbar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {navData: props.navData, tiles: props.navData}
  }

  renderEntries (entries, lvl = 1) {
    return (
      <Fragment>{
        entries ? entries.map((entry, i) => (
          <Fragment key={i}>
            <NavLink action={this.tileAction.bind(this, entry)} entry={entry} lvl={lvl} />
            {
              entry.children ? this.renderEntries(entry.children, lvl + 1) : null
            }
          </Fragment>
        ))
          : null
      }
      </Fragment>
    )
  }

  goHome () {
    this.go('home')
  }

  go (page) {
    const baseline = `/d/${this.props.dashboardId}`
    Router.push(`${baseline}/${page}`, `${baseline}/${page}`)
  }

  showTiles (children) {
    Router.push(`/dash`, `/dash`)
  }

  tileAction (e) {
    if (e.module) {
      const moduleId = e.label.replace(' ', '')

      Router.push({
        pathname: '/dashboard',
        query: { id: this.props.dashboardId, module: moduleId }
      }, `${moduleId}`)
    } else {
      window.location = '#'
    }
  }

  renderNavBar (navData) {
    return (
      <div className='navbar' >
        <ul>
          <NavLink entry={{label: 'Welcome'}} action={this.go.bind(this, '')} lvl={1} />
          <NavLink entry={{label: 'Home'}} action={this.goHome.bind(this)} lvl={1} />
          <NavLink entry={{label: 'Caseload'}} action={this.go.bind(this, 'caseload')} lvl={1} />
          <NavLink entry={{label: 'Agenda React'}} action={this.go.bind(this, 'module')} lvl={1} />
          <NavLink entry={{label: 'Nieuwe client'}} action={this.go.bind(this, 'personalia')} lvl={1} />
          {this.renderEntries(navData)}
        </ul>
        <style jsx>{navBarStyle}</style>
      </div>
    )
  }

  render () {
    let {navData} = this.state

    return (
      <Fragment>
        {this.renderNavBar(navData)}
      </Fragment>
    )
  }
}

export default Navbar
