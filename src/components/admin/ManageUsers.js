import {React, useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import {Button, DropdownButton, Dropdown} from 'react-bootstrap'
import StoreNavbar from '../StoreNavbar'
import './../styles/ManageUsers.css'


function ManagePromotions(){

    const [user, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers(){
            console.log('in fetchUsers')
            let usersGetData={
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://localhost:3000',
                    'Access-Control-Allow-Credentials': true,
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            }
            const response = await fetch('http://localhost:3000/api/users', usersGetData)
            const data = await response.json()
            if(data.errors) {
                console.log(data.errors.split(';')) // TODO: Add a set erros hook (see Homepage.js)
            }
            await setUsers(data)
        }
        fetchUsers()
    }, [])


    const userCol = user.map( (users, usersIndex)  => (
    
        <Row className = "row-list-manusers" key = {users.email}>
            <Col className = "col-list-manusers"> {users.lastName} </Col>
            <Col className = "col-list-manusers"> {users.firstName} </Col>
            <Col id = "col-list-email-manusers"> {users.email} </Col>
            <Col className = "col-list-manusers"> {users.recievePromotions ? ('Yes') : ('No')}  </Col>
            <Col className = "col-list-manusers"> {users.dateJoined.substring(0,10)} </Col>
            <Col className = "col-list-manusers"> {users.status} </Col>
            <Col className = "col-list-manusers"> {users.userType} </Col>
            <div id = "but-cont-manusers">
                <Col id = "col-susp-manusers">
                    {(users.userType != 'admin') &&
                    <Button 
                        id = "but-susp-manusers" 
                        value = {usersIndex} 
                        onClick = {(f) => {handleClick(f.currentTarget.value)}} 
                    >     
                        {(users.status == 'suspended' ? ('Unsuspend') : ('Suspend'))}
                    </Button>
                    }   
                </Col>
                
                <Col id = "col-type-manusers">
                    <DropdownButton id = "but-type-manusers" title="Type">
                        <Dropdown.Item> Admin </Dropdown.Item>  
                        <Dropdown.Item> Employee </Dropdown.Item>  
                        <Dropdown.Item> Customer </Dropdown.Item>
                    </DropdownButton>
                </Col>
            </div>
        </Row>

    ))


    function handleClick (curbutval) {

        let userEmail = user[curbutval].email
        console.log(userEmail)

        let userStatus= user[curbutval].status
        console.log(userStatus)

        async () => {
            console.log('in patchUsers')
            let usersData={
                method: 'PATCH',
                withCredentials: true,
                credentials: 'include',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://localhost:3000',
                    'Access-Control-Allow-Credentials': true,
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    'email': userEmail,
                })
            }
            const userResponse = await (await fetch('http://localhost:3000/api/users', usersData)).json()
            if(userResponse.errors) {
                console.log(userResponse.errors.split(';'))
            }
            else {
                console.log('no errors')
            } 

        }


    }
    





    return  (
        
        <div>
            <StoreNavbar/>
            <div id = "cont-manusers">
                <Row id = "row-title-manusers">
                    <Col className = "col-title-manusers"> Last Name </Col>
                    <Col className = "col-title-manusers"> First Name </Col>
                    <Col id = "col-title-email-manusers"> Email </Col>
                    <Col className = "col-title-manusers"> Recieving Promotions </Col>
                    <Col className = "col-title-manusers"> Date Joined </Col>
                    <Col className = "col-title-manusers"> Status </Col>
                    <Col className = "col-title-manusers"> User Type </Col>          
                </Row>
                {userCol}
            </div>
        </div>
    )

}

export default ManagePromotions