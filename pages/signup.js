import { Button, Link, TextField } from "@mui/material";
import { useReducer } from "react";
import React from "react";

function Signup() {

    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    }
    const [state, dispatch] = useReducer(reducer,initialState);
    const { firstname, lastname, email, password } = state;
    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch({
        //     type: 'login'
        // })
        savedUser()
    }
    
    async function savedUser() {
        try {
            const hashedPassword = CryptoJS.SHA256(state.password).toString()
            const response = await fetch('api/user', {
                method: 'POST',
                body: JSON.stringify({...state,password: hashedPassword}),
                headers: {
                    'Content-Type': 'application/json; cahrset-8'
                }
            });
            if (!response) {
                throw new Error(response.statusText);
            }
            return console.log(response.statusText);
        } catch(err) {
            console.error(err);
        }
        
    }

    return (
        <React.Fragment>
            <div className="form">
                <form onSubmit={handleSubmit} className="userform">
                    <label htmlFor="firstname">First Name</label>
                    <input required id="firstname" type="text" placeholder="First Name"
                        name="firstname" value={firstname} onChange={(e) => {
                            dispatch({
                                type: 'Change_firstname',
                                name: e.target.value
                            })
                        }} />

                    <label htmlFor="name">Last Name</label>
                    <input required id="lastname" type="text" placeholder="Last Name" name="lastname" value={lastname}
                        onChange={(e) => {
                            dispatch({
                                type: 'Change_lastname',
                                name: e.target.value
                            })
                        }} />

                    <label htmlFor="username">Username</label>
                    <input required id="username" type="text" placeholder="Username" name="email" value={email}
                        onChange={(e) => {
                            dispatch({
                                type: 'Change_email',
                                name: e.target.value
                            })
                        }} />

                    <label htmlFor="name">Password</label>
                    <input required id="password" type="password" placeholder="Password" name="password" value={password} minLength={6}
                        onChange={(e) => {
                            dispatch({
                                type: 'Change_password',
                                name: e.target.value
                            })
                        }} />

                    <Button type='submit'
                        className="login-button">Sign Up
                    </Button>
                </form>
            </div>

        </React.Fragment>
    )
}

function reducer(state, action) {
    switch (action.type) {
        case 'Change_firstname': {
            return {
                ...state,
                firstname: action.name
            };
        }
        case 'Change_lastname': {
            return {
                ...state,
                lastname: action.name
            };
        }
        case 'Change_email': {
            return {
                ...state,
                email: action.name
            };
        }
        case 'Change_password': {
            return {
                ...state,
                password: action.name
            }
        }
        case 'login': {
            return {
                ...state,
                isLoading: true
            }
        }
    }
    throw Error('Unknown action: ' + action.type);
}

export default Signup;