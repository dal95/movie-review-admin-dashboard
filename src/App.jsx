import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './layout'
import routes from './Routes/routes'
import { PrivateRoute } from './Routes'

function App () {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map(route =>
            route.private ? (
              <PrivateRoute key={route} {...route} />
            ) : (
              <Route key={route} {...route} />
            )
          )}
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
