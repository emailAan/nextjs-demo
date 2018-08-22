import React, {Fragment} from 'react'
import css from 'styled-jsx/css'

import NavigationLink from './navigation-link'

const NavigationBarStyle = css`
div.NavigationBar::-webkit-scrollbar {
    width: 10px;
}
div.NavigationBar::-webkit-scrollbar-track {
    background: #5c646c; 
}
div.NavigationBar::-webkit-scrollbar-thumb {
    background: #4b555f; 
}
div.NavigationBar::-webkit-scrollbar-thumb:hover {
    background: #555; 
}
.NavigationBar {
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
.NavigationBar ul {
  align-items: center;
  list-style-type: none;
  padding: 0;
}
`

const NavigationBarContainer = ({children}) => (
  <div className='NavigationBar' >
    <ul>{children}</ul>
    <style jsx>{NavigationBarStyle}</style>
  </div>
)

class NavigationBar extends React.Component {
  constructor (props) {
    super(props)

    this.navigationAction = this.navigationAction.bind(this)
    this.go = this.go.bind(this)
  }

  renderEntries (entries, lvl = 1) {
    return (
      <Fragment>{
        entries ? entries.map((entry, i) => (
          <Fragment key={i}>
            <NavigationLink action={() => this.navigationAction(entry)} entry={entry} lvl={lvl} />
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
    this.props.openContent(item.id, item.parameters)
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
        ? child.props.entry.id === this.props.currentModule
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
    let {navData} = this.props
    return (
      <NavigationBarContainer>
        { this.addSelectedToChildren(this.props.stickyItems)}
        <br />
        {this.addSelectedToChildren(this.renderEntries(navData))}
      </NavigationBarContainer>
    )
  }
}

export NavigationLink from './navigation-link'
export default NavigationBar
