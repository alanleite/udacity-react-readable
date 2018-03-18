import { withRouter } from 'react-router-dom'
import Container from './container'
import connector from './connector'
export default withRouter(connector(Container))