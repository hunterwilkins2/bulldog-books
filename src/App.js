import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Forgot from './components/Forgot'
import User from './components/user/User'
import Cart from './components/user/Cart'
import Profile from './components/user/Profile'
import Orders from './components/user/Orders'
import Admin from './components/admin/Admin'
import Confirmation from './components/Confirmation'


// need to troubleshoot why Cart, Orders, Profile not rendering

function App() {

    document.body.style = 'background: #f2f3f4'

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/confirmation' exact component={Confirmation} />
                <Route path='/forgot' exact component={Forgot} />
                <Route path='/user' exact component={User} />
                <Route path='/admin' exact component={Admin} />
                <Route path='/user/cart' component={Cart}/>
                <Route path='/user/orders' component={Orders}/>
                <Route path='/user/profile' component={Profile}/>
            </Switch>
        </Router>
    )
}

export default App
