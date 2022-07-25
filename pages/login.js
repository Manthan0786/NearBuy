import { Button } from "@mui/material";
import HeaderLogin from "../src/components/loginHeader";

function Login() {
    const handleSubmit = (e) => {
        e.preventdefault();
    }
    return (
        <>
            <HeaderLogin />
            <div className="loginpage">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="container">
                            <label className="label">Email Address</label>
                            <input required className="input" type='email' />
                        </div>
                        <div className="container">
                            <label className="label">Password</label>
                            <input required className="input" type='password'  />
                            <a href="#" className="forgot-password">
                            Forgot password?
                        </a> <br />
                        </div>
                        <Button type='submit' className="login-button">Login</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;