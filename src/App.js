import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// import Login from './components/Login'
import Register from './components/Register'
import Forgot from './components/Forgot'
import ResetPassword from './components/ResetPassword'
import Confirmation from './components/Confirmation'
import Homepage from './components/Homepage'
import Cart from './components/Cart'
import Profile from './components/Profile'
import Orders from './components/Orders'
import Checkout from './components/Checkout'
import Login from './components/Login'
import ManagePromotions from './components/admin/ManagePromotions'
import ManageUsers from './components/admin/ManageUsers'
import AddBook from './components/admin/AddBook'
import UpdatePromo from './components/admin/UpdatePromo'
import EditBook from './components/admin/EditBook'
import MoreInfo from './components/MoreInfo'
import OrderHistory from './components/admin/OrderHistory'

function App() {

    document.body.style = 'background: #f2f3f4'

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Homepage} />
                <Route path='/MoreInfo' exact component={MoreInfo} />
                <Route path='/register' exact component={Register} />
                <Route path='/forgot' exact component={Forgot} />
                <Route path='/reset-password' exact component={ResetPassword} />
                <Route path='/confirmation' exact component={Confirmation} />
                <Route path='/user/cart' component={Cart}/>
                <Route path='/user/checkout' component={Checkout}/>
                <Route path='/user/orders' component={Orders}/>
                <Route path='/user/profile' component={Profile}/>
                <Route path='/Login' exact component={Login} />
                <Route path='/admin/ManagePromotions' exact component={ManagePromotions} />
                <Route path='/admin/ManageUsers' exact component={ManageUsers} />
                <Route path='/admin/AddBook' exact component={AddBook} />
                <Route path='/admin/EditBook' exact component={EditBook} />
                <Route path='/admin/UpdatePromo' exact component={UpdatePromo} />
                <Route path='/admin/OrderHistory' exact component={OrderHistory} />
            </Switch>
        </Router>
    )
}

export default App
