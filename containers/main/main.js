import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LockIcon from '@material-ui/icons/Lock'
import AccountIcon from '@material-ui/icons/AccountBox'
import NotificationsIcon from '@material-ui/icons/Notifications'
import DashboardIcon from '@material-ui/icons/Dashboard'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

import Content from '../../components/content'
import {signOut} from '../../utils/auth'
import { swithDashboard, openAccount, Router } from '../../utils/routes'
import {setAuthentication} from './actions'
import redirect from '../../utils/redirect'

const drawerWidth = 200

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    height: '100vh'
    // overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  }
})

class Main extends React.Component {
  state = {
    open: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true })
  };

  handleDrawerClose = () => {
    this.setState({ open: false })
  };

  renderContent () {
    const { classes, content, contentTitle } = this.props

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography variant='display1' gutterBottom>{contentTitle}</Typography>
        <Content>{content}</Content>
      </main>
    )
  }

  async signOut () {
    const res = await signOut()
    const authenticated = res.auth
    const payload = { authenticated, authData: res }
    console.log(payload)
    this.props.setAuthentication(payload)
    redirect('/login', {})
  }

  renderSidebar () {
    const { classes, navigationItems, dashboard } = this.props

    return (
      <Drawer
        variant='permanent'
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
        }}
        open={this.state.open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        { this.props.showSwitchDashboard ? (
          <Fragment>
            {this.state.open ? (
              <ListItem>
                <ListItemText primary={dashboard ? dashboard.title : null} />
              </ListItem>
            ) : null }
            <ListItem button onClick={swithDashboard}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboards' />
            </ListItem>
            <Divider />
          </Fragment>
        ) : null }
        <ListItem button onClick={Router.back}>
          <ListItemIcon>
            <KeyboardBackspaceIcon />
          </ListItemIcon>
          <ListItemText primary='Terug' />
        </ListItem>
        { navigationItems }
        { navigationItems ? <Divider /> : null }
        <ListItem button onClick={() => openAccount()}>
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText primary='Mijn gegevens' />
        </ListItem>
        <ListItem button onClick={() => this.signOut()}>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary='Uitloggen' />
        </ListItem>
      </Drawer>
    )
  }

  renderAppbar () {
    const { classes, title } = this.props

    return (
      <AppBar
        position='absolute'
        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={this.handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              this.state.open && classes.menuButtonHidden
            )}>
            <MenuIcon />
          </IconButton>
          <Typography variant='display3' color='inherit' noWrap className={classes.title}>
            {title}
          </Typography>
          <Typography variant='title' color='inherit' noWrap className={classes.title} />
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }

  render () {
    const { classes } = this.props

    return (
      <Fragment>
        <CssBaseline />
        <div className={classes.root}>
          {this.renderAppbar()}
          {this.renderSidebar()}
          {this.renderContent()}
        </div>
      </Fragment>
    )
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
}

Main.defaultProps = {
  showSwitchDashboard: true
}

const mapStateToProps = state => {
  return {
    title: state.main.title,
    subTitle: state.main.subTitle,
    dashboard: state.dashboard
  }
}

const mapDispatchToProps = {
  setAuthentication: (authInfo) => {
    return setAuthentication(authInfo)
  }
}

export default withStyles(styles)(connect(
  mapStateToProps, mapDispatchToProps
)(Main))
