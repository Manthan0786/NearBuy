import { Button } from "@mui/material";
import { useReducer, useState } from "react";

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
            case 'login' : {
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
    const { userName, password, isLoading } = state

    const handleSubmit = (e) => {
        dispatch({
            type:'login'
        })
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
                        <Button type='submit' className="login-button" disabled={isLoading}>{isLoading?'Logging In':'Log In'}</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

// export async function getServerSideProps({ req, res }) {
//     const userId = new Cookies(req, res).get('user_id');
//     const projects = await new Promise((resolve, reject) =>
//       pool.query(
//         SQL`INSERT INTO users (email, password) WHERE user_id = ${userId};`,
//         (err, results) => (err ? reject(err) : resolve(results))
//       )
//     );
//     return { props: { projects } };
//   }

export default Login;