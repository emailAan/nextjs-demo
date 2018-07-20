import React, {Fragment} from 'react'
import Router from 'next/router'
// import { fetchModuleInfo } from './ModuleInfo'
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

// async function fetchCounterAsync (e, navbarInstance) {
//   let moduleInfo = await fetchModuleInfo(e.module, e.subModule)

//   if (!moduleInfo || !moduleInfo.counter) {
//     return
//   }

//   const response = await fetch(moduleInfo.counter)

//   let counter = await response.json()
//   navbarInstance.updateNavItemWithCounter(e, counter.count)
// }

// function fetchCounters (navData, navbarInstance) {
//   if (!navData) {
//     return
//   }

//   navData.map((e) => {
//     if (e.children) {
//       fetchCounters(e.children, navbarInstance)
//     }
//     return fetchCounterAsync(e, navbarInstance)
//   })
// }

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
    console.log('Fetching counters is disabled.')
    // fetchCounters(this.state.navData, this)
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
    this.hideTiles()
    // window.location = `/${page}`
  }

  hideTiles () {
    this.setState({...this.state, showTiles: false})
  }

  showTiles (children) {
    Router.push(`/dash`, `/dash`)
    this.setState({...this.state, tiles: children, showTiles: true})
  }

  tileAction (e) {
    if (e.module) {
      const moduleId = e.label.replace(' ', '')

      Router.push({
        pathname: '/dashboard',
        query: { id: this.props.dashboardId, module: moduleId }
      }, `${moduleId}`)
    } else {
      this.showTiles(e.children)
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

  renderTiles (tiles) {
    return this.state.showTiles
      ? <div style={{position: 'absolute', left: '260px', top: '65px'}}>
        {
          tiles.map((e, i) => {
            return (
              <Fragment>
                <div key={i} className='tile tileSize1x1 x224 x228 txtWhite'>
                  <div style={{top: '0px', left: '0px', bottom: '0px', right: '0px'}}>
                    <span style={{position: 'absolute', width: 'auto', height: 'auto', top: '0px', left: '0px', bottom: '0px', right: '0px'}}>
                      <div>
                        <span className='fontCounterTile counterOutput'>{e.counter}</span>
                        <img className='wachten fontCounterTile' alt='wachten' style={{display: 'none'}} src='/UserPortal/resources/images/wait.svg' />
                        <div>
                          <span className='fontCounterDescSquare'>{e.label}</span>
                        </div>
                      </div>
                    </span>
                    <a className='tileLink tileSize1x1' onClick={this.tileAction.bind(this, e)} />
                  </div>
                </div>
                <style jsx>{tilesStyle}
                </style>
              </Fragment>
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

let tilesStyle = css`

  /* Tiles */
  .tile {
    float: left;
    margin: 5px !important;
    padding: 2px !important;
    background-color: #e57100;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}

.tileActive {
    border-bottom-color: #ed6647 !important;
    border-bottom-style: solid !important;
}

.tile > div {
    overflow: hidden !important;
}

.tile > div > div {
    overflow: hidden !important;
}

.tile:hover {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    opacity: 0.9;
    filter: alpha(opacity=90);
    /* For IE8 and earlier */
}

.subLinksTile {
    padding: 1px;
}

.tile:first-child {
    margin-left: 0px !important;
    margin-right: 10px !important;
}

.tileWrapper {
    z-index: 1;
}

.tileSize1x1 {
    position: relative;
    max-width: 160px !important;
    width: 160px !important;
    height: 160px !important;
}

.refreshNav {
    margin-right: 5px;
}

.refreshNav img {
    width: 23px;
}
.tileSize1x2 {
    position: relative;
    max-width: 160px !important;
    width: 160px !important;
    height: 333px !important;
}

.tileSize1x3 {
    position: relative;
    max-width: 160px !important;
    width: 160px !important;
    height: 506px !important;
}

.tileSize1x4 {
    position: relative;
    max-width: 160px !important;
    width: 160px !important;
    height: 679px !important;
}

.tileSize1x5 {
    position: relative;
    max-width: 160px !important;
    width: 160px !important;
    height: 852px !important;
}

.tileSize1x6 {
    position: relative;
    max-width: 160px !important;
    width: 160px !important;
    height: 1025px !important;
}

.tileSize2x1 {
    position: relative;
    max-width: 333px !important;
    width: 333px !important;
    height: 160px !important;
}

.tileSize2x2 {
    position: relative;
    max-width: 333px !important;
    width: 333px !important;
    height: 333px !important;
}

.tileSize2x3 {
    position: relative;
    max-width: 333px !important;
    width: 333px !important;
    height: 506px !important;
}

.tileSize2x4 {
    position: relative;
    max-width: 333px !important;
    width: 333px !important;
    height: 679px !important;
}

.tileSize2x5 {
    position: relative;
    max-width: 333px !important;
    width: 333px !important;
    height: 852px !important;
}

.tileSize2x6 {
    position: relative;
    max-width: 333px !important;
    width: 333px !important;
    height: 1025px !important;
}

.tileSize3x1 {
    position: relative;
    max-width: 506px !important;
    width: 506px !important;
    height: 160px !important;
}

.tileSize3x2 {
    position: relative;
    max-width: 506px !important;
    width: 506px !important;
    height: 333px !important;
}

.tileSize3x3 {
    position: relative;
    max-width: 506px !important;
    width: 506px !important;
    height: 506px !important;
}

.tileSize3x4 {
    position: relative;
    max-width: 506px !important;
    width: 506px !important;
    height: 679px !important;
}

.tileSize3x5 {
    position: relative;
    max-width: 506px !important;
    width: 506px !important;
    height: 852px !important;
}

.tileSize3x6 {
    position: relative;
    max-width: 506px !important;
    width: 506px !important;
    height: 1025px !important;
}

.tileSize4x1 {
    position: relative;
    max-width: 679px !important;
    width: 679px !important;
    height: 160px !important;
}

.tileSize4x2 {
    position: relative;
    max-width: 679px !important;
    width: 679px !important;
    height: 333px !important;
}

.tileSize4x3 {
    position: relative;
    max-width: 679px !important;
    width: 679px !important;
    height: 506px !important;
}

.tileSize4x4 {
    position: relative;
    max-width: 679px !important;
    width: 679px !important;
    height: 679px !important;
}

.tileSize4x5 {
    position: relative;
    max-width: 679px !important;
    width: 679px !important;
    height: 852px !important;
}

.tileSize4x6 {
    position: relative;
    max-width: 679px !important;
    width: 679px !important;
    height: 1025px !important;
}

.tileSize5x1 {
    position: relative;
    max-width: 852px !important;
    width: 852px !important;
    height: 160px !important;
}

.tileSize5x2 {
    position: relative;
    max-width: 852px !important;
    width: 852px !important;
    height: 333px !important;
}

.tileSize5x3 {
    position: relative;
    max-width: 852px !important;
    width: 852px !important;
    height: 506px !important;
}

.tileSize5x4 {
    position: relative;
    max-width: 852px !important;
    width: 852px !important;
    height: 679px !important;
}

.tileSize5x5 {
    position: relative;
    max-width: 852px !important;
    width: 852px !important;
    height: 852px !important;
}

.tileSize5x6 {
    position: relative;
    max-width: 852px !important;
    width: 852px !important;
    height: 1025px !important;
}

.tileSize6x1 {
    position: relative;
    max-width: 1025px !important;
    width: 1025px !important;
    height: 160px !important;
}

.tileSize6x2 {
    position: relative;
    max-width: 1025px !important;
    width: 1025px !important;
    height: 333px !important;
}

.tileSize6x3 {
    position: relative;
    max-width: 1025px !important;
    width: 1025px !important;
    height: 506px !important;
}

.tileSize6x4 {
    position: relative;
    max-width: 1025px !important;
    width: 1025px !important;
    height: 679px !important;
}

.tileSize6x5 {
    position: relative;
    max-width: 1025px !important;
    width: 1025px !important;
    height: 852px !important;
}

.tileSize6x6 {
    position: relative;
    max-width: 1025px !important;
    width: 1025px !important;
    height: 1025px !important;
}

/* ~0.25 (45px) high 1 wide rectangular tile. Used for within module navigation. */
.tileSize025x1 {
    position: relative;
    max-width: 170px !important;
    width: 170px !important;
    height: 45px !important;
}

.dashboardIconTile {
    position: absolute;
    z-index: 0;
}

.tileLink {
    z-index: 999;
    position: absolute;
    top: 0px;
    margin: 2px;
    background: rgba(200, 54, 54, 0);
}

/**Text Colors**/
.txtLess {
    color:#938e8e;
    font-style: italic;
}

.txtWhite > * {
    color: #ffffff;
}

.txtWhite {
    color: #ffffff;
}

.txtWhite af|link {
    color: #ffffff;
}

.txtOrange > * {
    color: #e57100 !important;
}

.txtOrange {
    color: #e57100 !important;
}

.txtBlue > * {
    color: #4d81b3 !important;
}

.txtBlue {
    color: #4d81b3 !important;
}

.txtRed > * {
    color: #ca3e3e !important;
}

.txtRed {
    color: #ca3e3e !important;
}

.txtGreen > * {
    color: #1ebb73 !important;
}

.txtGreen {
    color: #1ebb73 !important;
}

.txtGrey > * {
    color: #787878 !important;
}

.txtGrey {
    color: #787878 !important;
}
/**Fonts Sizes**/
.fontBig {
    font-size: 24px;
}

.fontMedium {
    font-size: 18px;
}

.fontSmall {
    font-size: 12px;
}

.fontItallic {
    font-style: italic;
}
/**Text Tile**/
.fontCounterTile {
    display: block;
    float: right;
    font-size: 55px;
    padding: 0 10px 0 0;
    position: relative;
}

.fontCounterTileSmall {
    display: block;
    float: right;
    font-size: 20px;
    padding: 0 5px 0 0;
    position: relative;
}

.fontCounterDescSquare {
    position: absolute;
    font-size: 14px;
    bottom: 0px;
    padding: 10px;
}

.fontCounterDescSquareSmall {
    position: absolute;
    font-size: 14px;
    bottom: 0px;
    padding: 10px;
    padding-bottom: 4px;
    width: 135px;
}

.fontCounterDescSquareSmallActive {
    position: absolute;
    font-size: 14px;
    bottom: 0px;
    padding: 10px;
    padding-bottom: 1px;
    border-bottom-color: #5c646c !important;
    border-bottom-style: solid !important;
    width: 100%;
}

/** Maindashboard Tile **/
.imageTextTile > div > img {
    padding-top: 31px;
    padding-bottom: 15px;
    width: 65px;
}

.tileWrapper af|outputLabel {
    padding-top:10px;
    padding-left:10px;
}

.imageTextTile > div > span {
    display: block;
    width: 164px;
    height: 40px;
    bottom: 0px;
    min-width: 160px;
    color: #495b6c;
    background-color: #ffffff;
    font-size: 14px;
    padding-top: 10px;
}
`

export default Navbar
