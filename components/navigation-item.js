import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const NavItem = ({item, lvl, action, selected}) => (
  <ListItem button onClick={action}>
    <ListItemIcon>
      <ArrowForwardIcon />
    </ListItemIcon>
    <ListItemText primary={item.label} />
  </ListItem>
)

export default NavItem
