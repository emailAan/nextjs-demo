import React, {Fragment} from 'react'
import { fetchModuleInfo } from './ModuleInfo'

async function fetchCounterAsync (e, navbarInstance) {
  let moduleInfo = await fetchModuleInfo(e.module, e.subModule)

  if (!moduleInfo || !moduleInfo.counter) {
    return
  }

  // console.log(`Loading ${moduleInfo.counter}...`)
  const response = await fetch(moduleInfo.counter)

  let counter = await response.json()
  navbarInstance.updateNavItemWithCounter(e, counter.count)
}

function fetchCounters (navData, navbarInstance) {
  if (!navData) {
    return
  }

  navData.map((e) => {
    if (e.children) {
      fetchCounters(e.children, navbarInstance)
    }
    return fetchCounterAsync(e, navbarInstance)
  })
}

let NavLink = ({entry, lvl, action}) => (
  <Fragment>
    <a onClick={action}>
      <li className={lvl > 1 ? 'second' : ''} >
        <span>{entry.label}</span>
        {entry.counter ? <span className='counter' >{entry.counter}</span> : null }
      </li>
    </a>
    <style jsx>{`
      .navbar li:hover {
          background-color: #4b555f;
      }      
      .navbar li {
          padding-top: 14px;
          padding-bottom: -14px;
          padding-left: 10px;
          padding-right: 10px;
          height: 100%;
      }      
      .navbar li.second {
          background-color: #4b555f;
      }      
      .navbar li.second:hover {
          background-color: #36404d;
      }      
      .navbar li:hover {
          color: black;
      }      
      .navbar a {
          height: 100%;
          text-decoration: none;
          color: white;
      }      
        `}
    </style>
  </Fragment>
)

class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {navData: props.navData, tiles: props.navData}
  }

  findAndUpdateItem (items, item, counter) {
    let updatedItems = items.map((e) => {
      let updatedItem = (JSON.stringify(item) === JSON.stringify(e)) ? {...e, counter: counter} : {...e}

      if (e.children) {
        updatedItem.children = this.findAndUpdateItem(e.children, item, counter)
      }

      return updatedItem
    })
    return updatedItems
  }

  updateNavItemWithCounter (item, counter) {
    let navData = this.findAndUpdateItem(this.state.navData, item, counter)

    this.setState({...this.state, navData: navData, timestamp: new Date()})
  }

  componentDidMount () {
    fetchCounters(this.state.navData, this)
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
    window.location = '#'
  }

  hideTiles () {
    this.setState({...this.state, showTiles: false})
  }

  showTiles (children) {
    this.setState({...this.state, tiles: children, showTiles: true})
  }

  tileAction (e) {
    if (e.module) {
      this.hideTiles()
      window.location = `#/${e.label.replace(' ', '')}`
    } else {
      this.showTiles(e.children)
      window.location = '#'
    }
  }

  renderNavBar (navData) {
    return (
      <div className='navbar' >
        <ul>
          <NavLink entry={{label: 'Home'}} action={this.goHome} lvl={1} />
          {this.renderEntries(navData)}
        </ul>
        <style jsx>{`

        .navbar {
          font-family: Arial, Helvetica, sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          background-color: #5c646c;
          color: white;
          font-size: 14px;
          font-weight: bold;
          width: 250px;
          height: 100%;
          /* display: flex; */
          align-items: center;
          overflow-y: scroll;
          overflow-x: hidden;
      }
      
      .navbar ul {
          /* display: flex; */
          align-items: center;
          list-style-type: none;
          padding: 0;
          /* height: 100%; */
      }
      
      .navbar li:hover {
          background-color: #4b555f;
      }
      
      .navbar li {
          padding-top: 14px;
          padding-bottom: -14px;
          padding-left: 10px;
          padding-right: 10px;
          height: 100%;
      }
      
      .navbar li.second {
          background-color: #4b555f;
      }
      
      .navbar li.second:hover {
          background-color: #36404d;
      }
      
      .navbar li:hover {
          color: black;
      }
      
      .navbar a {
          height: 100%;
          text-decoration: none;
          color: white;
      }      
        `}
        </style>
      </div>
    )
  }

  renderTiles (tiles) {
    return this.state.showTiles
      ? <div style={{position: 'absolute', left: '260px'}}>
        {
          tiles.map((e, i) => {
            return (
              <div key={i} className='tile tileSize1x1 x224 x228 txtWhite'>
                <div style={{top: '0px', left: '0px', bottom: '0px', right: '0px'}}>
                  <span style={{position: 'absolute', width: 'auto', height: 'auto', top: '0px', left: '0px', bottom: '0px', right: '0px'}}>
                    <div>
                      <span className='fontCounterTile counterOutput'>{e.counter}</span>
                      <img className='wachten' alt='wachten' class='fontCounterTile' style={{display: 'none'}} src='/UserPortal/resources/images/wait.svg' />
                      <div>
                        <span className='fontCounterDescSquare'>{e.label}</span>
                      </div>
                    </div>
                  </span>
                  <a className='tileLink tileSize1x1' onClick={this.tileAction.bind(this, e)} />
                </div>
              </div>
            )
          })
        }
      </div>
      : null
  }

  render () {
    let {navData, tiles} = this.state

    return (
      <Fragment>
        {this.renderNavBar(navData)}
        {this.renderTiles(tiles)}
      </Fragment>
    )
  }
}

export default Navbar
