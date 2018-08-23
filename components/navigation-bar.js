import React, {Fragment} from 'react'

import NavigationList from './navigation-list'
import NavigationItem from './navigation-item'
import NavigationSeparator from './navigaion-separator'

class NavigationBar extends React.Component {
  renderItems (items, lvl = 1) {
    return (
      <Fragment>
        {
          items ? items.map((item, i) => (
            <Fragment key={i}>
              <NavigationItem action={() => this.props.openContent(item.id, item.parameters)} item={item} lvl={lvl} />
              {
                item.children ? this.renderItems(item.children, lvl + 1) : null
              }
            </Fragment>
          ))
            : null
        }
      </Fragment>
    )
  }

  addSelectedToNavItems (children) {
    return React.Children.map(children, (child) => {
      // Not a React component
      if (!child || !child.props) {
        return child
      }

      let selected = (child.props.item)
        ? child.props.item.id === this.props.currentModule
        : false

      // If current component has additional children, traverse through them as well!
      if (child.props.children) {
        return React.cloneElement(child, {
          children: this.addSelectedToNavItems(child.props.children),
          selected
        })
      }

      // Clone the component with the added property 'selected'
      return React.cloneElement(child, { selected })
    })
  }

  render () {
    let {navData, stickyItems} = this.props
    return (
      <NavigationList>
        { this.addSelectedToNavItems(stickyItems)}
        <NavigationSeparator />
        {this.addSelectedToNavItems(this.renderItems(navData))}
      </NavigationList>
    )
  }
}

export {NavigationSeparator, NavigationItem}
export default NavigationBar
