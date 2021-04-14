/* eslint-disable no-unused-vars */
import {React, useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import {Button, DropdownButton, Dropdown} from 'react-bootstrap'
import StoreNavbar from '../StoreNavbar'
import './../styles/ManageUsers.css'


function ManagePromotions(){

    const [user, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers(){
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
                    <Button 
                        disabled={users.userType === 'admin'}
                        id = "but-susp-manusers" 
                        value = {usersIndex} 
                        onClick = {async (event) => {await handleClick(event)}} 
                    >     
                        {(users.status == 'suspended' ? ('Unsuspend') : ('Suspend'))}
                    </Button>
                </Col>
                
            
            </div>
        </Row>

    ))


    async function handleClick (event) {

        let userIndex = event.target.value
        let userStatus = user[userIndex].status
        let userEmail = user[userIndex].email


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

        let userResponse

        if(userStatus === 'active' || userStatus === 'inactive'){
            userResponse = await (await fetch('http://localhost:3000/api/users/suspend', usersData)).json()
        } else if(userStatus === 'suspended'){
            userResponse = await (await fetch('http://localhost:3000/api/users/unsuspend', usersData)).json()
        }

        if(userResponse.errors) {
            console.log(userResponse.errors.split(';'))
        }
        else {
            console.log('no errors')
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