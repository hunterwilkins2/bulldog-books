import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// import Login from './components/Login'
import Register from './components/Register'
import Forgot from './components/Forgot'
import ResetPassword from './components/ResetPassword'
import Confirmation from './components/Confirmation'
import Homepage from './components/Homepage'
import Cart from './components/user/Cart'
import Profile from './components/user/Profile'
import Orders from './components/user/Orders'
import Admin from './components/admin/Admin'
import Checkout from './components/user/Checkout'
import Login from './components/Login'


// need to troubleshoot why Cart, Orders, Profile not rendering

function App() {

    document.body.style = 'background: #f2f3f4'

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Homepage} />
                <Route path='/register' exact component={Register} />
                <Route path='/forgot' exact component={Forgot} />
                <Route path='/reset-password' exact component={ResetPassword} />
                <Route path='/confirmation' exact component={Confirmation} />
                <Route path='/admin' exact component={Admin} />
                <Route path='/user/cart' component={Cart}/>
                <Route path='/user/checkout' component={Checkout}/>
                <Route path='/user/orders' component={Orders}/>
                <Route path='/user/profile' component={Profile}/>
                <Route path='/Login' exact component={Login} />
            </Switch>
        </Router>
    )
}

export default App
