//import external functions
import React from 'react';
import { Button } from "reactstrap";

//function being exported
export default function Register() {

    //define the url
    const url = `http://131.181.190.87:3000/user/register`

    //function which is being used to register the user
    function register(email, password) {
            return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.message)
            })
    }

    //the html code which the react app displays
    return (
        <div id='regInputs'>
            <h1>Register</h1>
            <div>
                <label>Email:</label>
                <input
                    id='regEmail'
                    type="email"
                ></input>
            </div>
            <div>
                <label>Password:</label>
                <input
                    id="regPassword"
                    type="password"
                ></input>
            </div>
            <Button
                onClick={e => {
                    let email = document.getElementById("regEmail").value;
                    let password = document.getElementById("regPassword").value;
                    register(email, password);
                }}
            >Register</Button>
        </div>
    )
}