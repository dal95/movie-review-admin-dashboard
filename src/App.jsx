import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './layout'
import routes from './routes'

function App () {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map(route => (
            <Route key={route} {...route} />
          ))}
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
