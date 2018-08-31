import Typography from '@material-ui/core/Typography'

export default ({title}) => (
  <div>
    <Typography>{`The module '${title}' is not available.`}</Typography>
    <Typography>{`Please try again later.`}</Typography>
  </div>
)
