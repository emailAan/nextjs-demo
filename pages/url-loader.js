import {withRouter} from 'next/router'
import Typography from '@material-ui/core/Typography'

import Iframe from '../components/iframe'

export default withRouter((props) => (
  <div>
    <Typography variant='headline' gutterBottom>{props.router.query.url}</Typography>
    <Iframe url={props.router.query.url} maxWidth maxHeight />
  </div>
))
