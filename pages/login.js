import Grid from '@material-ui/core/Grid'

import Login from '../containers/login'

export default () => (
  <Grid
    container
    direction='row'
    justify='center'
    alignItems='center'>
    <Grid item>
      <Login />
    </Grid>
  </Grid>
)
