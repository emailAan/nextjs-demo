import React, {Fragment} from 'react'
import css from 'styled-jsx/css'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'

import Navbar, {NavLink} from './Navbar'

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

const Header = observer(({left, middle, right}) => (
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
))

const Container = ({children}) => <div>{children}</div>

const Title = ({value}) => <span style={{fontSize: '26px'}} >{value}</span>

const Module = ({module, title}) => <span>{`module:${module}, dash:${title}`}</span>

const Dash = ({info}) => <span>{info}</span>

const Brand = () => <img src='/brandImage.png' />

@inject('dashboard', 'openContent')
@observer
export default class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.swithDashboard = this.swithDashboard.bind(this)
    this.gotoDashboardHome = this.gotoDashboardHome.bind(this)
  }

  swithDashboard () {
    Router.push('/dashboard-selection', '/')
  }

  gotoDashboardHome () {
    this.props.openContent(null)
  }

  render () {
    const { module: m, title, info } = this.props.dashboard

    return (
      <Fragment>
        <Navbar
          stickyItems={(
            <Fragment>
              <NavLink entry={{label: 'Dashboard'}} action={this.swithDashboard} lvl={1} />
              <NavLink entry={{label: 'Home'}} action={() => this.gotoDashboardHome} lvl={1} />
              <br />
            </Fragment>
          )}
        />
        <Header
          left={(
            <Brand />
          )}
          middle={(
            <Title value={title} />
          )} />
        <Container>
          {m ? <Module module={m} title={title} /> : <Dash info={info} />}
        </Container>
      </Fragment>
    )
  }
}
