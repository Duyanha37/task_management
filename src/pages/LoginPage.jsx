import "./LoginPage.css"
import EyeOffIcon from "../assets/eye-off.svg?react"
import EyeIcon from "../assets/eye.svg?react"
import { useState } from "react"

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="login_page">
            <div className="login_container">
                <div className="login_header">
                    <img src="src\assets\logo.svg" alt="" />
                    <h3>Welcome back!</h3>
                    <p>Don't have an account? <a href="#">Sign up</a></p>
                </div>
                <div>
                    <form className="login_form" action="">
                        <div className="login_form_inputbox">
                            <input type="text" placeholder='Username' />
                            <div className="password_box">
                                <input type={showPassword ? "text" : "password"} placeholder='Password' />
                                <button type="button" className="eye_button" onClick={togglePasswordVisibility}>{showPassword ? <EyeOffIcon className="eye_icon" /> : <EyeIcon className="eye_icon" />}</button>
                            </div>
                        </div>
                        <div className="login_form_mid">
                            <hr /><span>or</span><hr />
                        </div>
                        <div className="google_box">
                            <button className='login_button' id="google"><img src="src\assets\google.svg" alt="Google Icon" />Tiếp tục sử dụng dịch vụ bằng Google</button>
                        </div>
                        <button className='login_button'>Log In</button>
                        <a className="forgot_password"href="#">Forgot your password?</a>
                        <a className="need_help" href="#">Need help?</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage