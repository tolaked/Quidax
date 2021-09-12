import { ApolloProvider } from '@apollo/client'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import client from './apollo'
import App from './App'

const Routes = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route path="/" component={App} />
                </Switch>
            </Router>
        </ApolloProvider>
    )
}

export default Routes