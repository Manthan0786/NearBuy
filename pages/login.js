import { Button, Link } from "@mui/material";
import { useReducer, useState } from "react";
import { PrismaClient } from "@prisma/client";
import Cookies from 'js-cookie';

function Login() {
    function reducer(state, action) {
        switch (action.type) {
            case 'Change_UserName': {
                return {
                    ...state,
                    userName: action.name
                };
            }
            case 'type_password': {
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
    const initialState = {
        userName: '',
        password: '',
        isLoading: false
    }
    const [state, dispatch] = useReducer(reducer, { initialState });
    const { userName, password, isLoading } = state;

    const user = {
        email: 'zyan@gmail.com',
        password: 'chirag',
    }

    async function savedUser() {
        try {
            const res = await fetch('api/login', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json; cahrset-8'
                }
            });
            const { data } = await fetch('/api/protected', {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${res.data.token}`,
                },
              });
            const response = await res.json();
            console.log(response);
            if (res.status === 401) {
                
                throw new Error(res.statusText);
            }
            if (!res) {
                throw new Error(res.statusText);
            }
            return await res.json();
        } catch (e) {
            console.error(e)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'login'
        })
        savedUser()
    }

    return (
        <>
            <div className="loginpage">
                <div>
                    <h1>Picture</h1>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        <div className="container">
                            <label className="label" for='Emial_Address'>Email Address</label>
                            <input
                                required
                                value={userName}
                                name='Emial_Address'
                                className="input"
                                id='Emial_Address'
                                type='email'
                                onChange={(e) => {
                                    dispatch({
                                        type: 'Change_UserName',
                                        name: e.target.value
                                    })
                                }} />
                        </div>
                        <div className="container">
                            <label className="label" for='Password'>Password</label>
                            <input
                                required
                                value={password}
                                name='Password'
                                className="input"
                                type='password'
                                id='Password'
                                onChange={(e) => {
                                    dispatch({
                                        type: 'type_password',
                                        password: e.target.value
                                    })
                                }} />
                            <a href="#" className="forgot-password">
                                Forgot password?
                            </a> <br />
                        </div>
                        <Button type='submit' className="login-button" disabled={isLoading}>{isLoading ? 'Logging In' : 'Log In'}</Button>
                        {/* <Button onClick={savedUser} className="login-button" > USER</Button> */}
                    </form>

                    <p>OR</p>

                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default Login;