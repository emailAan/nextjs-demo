import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import {Link, openDashboard} from '../utils/routes'
import Main from '../containers/main'

export default () => (
  <Main
    contentTitle='Selecteer een dashboard'
    showSwitchDashboard={false}
    content={
      <Grid
        container
        direction='row'
        justify='flex-start'
        spacing={16}
        alignItems='center'>
        <Grid item>
          <Card style={{width: 150}}>
            <CardContent>
              <Typography variant='title' gutterBottom>Medewerker</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                onClick={() => openDashboard('4H7V9A2S')}
              >Open</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card style={{width: 150}}>
            <CardContent>
              <Typography variant='title' gutterBottom>Client</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                color='primary'
                onClick={() => openDashboard('3JHD4GT5')}
              >Open</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    } />
)
