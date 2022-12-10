import { Button, Link, TextField } from "@mui/material";
import { useReducer } from "react";
import React from "react";

function Signup() {

    const initialState = {
        firstname: '',
        lastname: '',
        userName: '',
        password: '',
        isLoading: false
    }
    const [state, dispatch] = useReducer(reducer, { initialState });
    const { firstname, lastname, username, password, isLoading } = state;

    return (
        <React.Fragment>
            <form>
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
                <input required id="username" type="text" placeholder="Username" name="username" value={username}
                    onChange={(e) => {
                        dispatch({
                            type: 'Change_username',
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
                    className="login-button"
                    disabled={isLoading}>{isLoading ? 'Signing In' : 'Sign In'}</Button>
            </form>
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
        case 'Change_username': {
            return {
                ...state,
                username: action.name
            };
        }
        case 'Change_password': {
            return {
                ...state,
                password: action.password
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