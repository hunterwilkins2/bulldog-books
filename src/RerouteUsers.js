// Pass in the json of what is returned by a fetch request
// Will reroute a user to the log in page if they are not logged in
// Reroutes user to the confirmation page if they have not confirmed their email
// Reroutes a customer to the login page if they try to access an admin route
function isLoggedIn(json) {
    if(json.errors === 'Must be logged in') 
        window.location.href='/Login'

    if(json.errors === 'User must confirm their email')
        window.location.href='/confirmation'

    if(json.errors === 'Only admins can access that route')
        window.location.href='/Login'
}

module.exports = { isLoggedIn }
