//imports external functions 
import React from 'react';
import { Button } from "reactstrap";

//the function being exported
export default function Login() {

    //define the url
    const url = `http://131.181.190.87:3000/user/login`

    //function being used to log the user in and storing there login token in systems local storage
    function login(email, password) {
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                localStorage.setItem("token", res.token)
                console.log(res)
            })
    }

    //the html code which the react app displays
    return (
        <div id="loginInputs">
            <h1>Login</h1>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    id="logEmail"></input>
            </div>
            <div>
                <label>Password:</label>
                <input
                    type='password'
                    id='logPassword'
                ></input>
            </div>
            <Button onClick={e => {
                let email = document.getElementById("logEmail").value;
                let password = document.getElementById('logPassword').value;
                login(email, password);
            }}>
                Login</Button>
        </div>
    )
}