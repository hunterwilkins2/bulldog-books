import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Forgot from './components/Forgot'
import User from './components/User'


function App() {

    document.body.style = 'background: #f2f3f4'

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/forgot' component={Forgot} />
                <Route path='/user' component={User} />
            </Switch>
        </Router>
    )
}

export default App
