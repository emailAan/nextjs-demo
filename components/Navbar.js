import React, {Fragment} from 'react'
import css from 'styled-jsx/css'
import { inject } from 'mobx-react'

const navbarStyle = css`
div.navbar::-webkit-scrollbar {
    width: 10px;
}
div.navbar::-webkit-scrollbar-track {
    background: #5c646c; 
}
div.navbar::-webkit-scrollbar-thumb {
    background: #4b555f; 
}
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

export let NavLink = ({entry, lvl, action, selected}) => (
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

const NavbarContainer = ({children}) => (
  <div className='navbar' >
    <ul>{children}</ul>
    <style jsx>{navbarStyle}</style>
  </div>
)

@inject('dashboard', 'openContent')
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
            <NavLink action={this.navigationAction.bind(this, entry)} entry={entry} lvl={lvl} />
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

  go (page) {
    this.props.openContent(page, {c: 12, i: 1})
  }

  navigationAction (item) {
    if (item.module) {
      this.props.openContent(item.id, item.parameters, item.type)
    } else {
      window.location = '#'
    }
  }

  addSelectedToChildren (children) {
    return React.Children.map(children, (child) => {
      if (!child) {
        return child
      }
      if (!child.props) {
        return child
      }

      let selected = (child.props.entry)
        ? child.props.entry.id === this.props.dashboard.module
        : false

      // If current component has additional children, traverse through them as well!
      if (child.props.children) {
        return React.cloneElement(child, {
          children: this.addSelectedToChildren(child.props.children),
          selected
        })
      }

      return React.cloneElement(child, { selected })
    })
  }

  traverse (comp, fn) {
    this.addSelectedToChildren(comp)
  }

  render () {
    let {navData} = this.props.dashboard

    return (
      <NavbarContainer>
        { this.addSelectedToChildren(this.props.stickyItems)}
        {
          this.addSelectedToChildren(
            <Fragment>
              <NavLink entry={{label: 'Caseload', id: 'caseload'}}
                action={this.go.bind(this, 'caseload')} />
              <NavLink entry={{label: 'Agenda', id: 'agenda'}}
                action={this.go.bind(this, 'module')} />
              <NavLink entry={{label: 'Personalia', id: 'personalia'}}
                action={this.go.bind(this, 'personalia')} />
            </Fragment>
          )
        }
        <br />
        {this.addSelectedToChildren(this.renderEntries(navData))}
      </NavbarContainer>
    )
  }
}

export default Navbar
