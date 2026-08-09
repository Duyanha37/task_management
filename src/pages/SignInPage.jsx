import "./SignInPage.css"
import EyeOffIcon from "../assets/eye-off.svg?react"
import EyeIcon from "../assets/eye.svg?react"
import { useState } from "react"

function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const isFormValid = username.trim() !== "" && password.trim() !== "";

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        handlePasswordErrorMessage(e.target.value)
    }

    const handlePasswordBlur = () => {
        if (password.trim() === "") {
            setErrorMessage("Password is required.");   
        } else if (password.length < 8 && password.trim() !== "") {
            setErrorMessage("Password must be at least 8 characters long.");
        } else {
            setErrorMessage("");
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handlePasswordErrorMessage = (pass) => {
        if (pass.trim() === "" && errorMessage !== "") {
            setErrorMessage("Password is required.");
        } else if (pass.length < 8 && pass.trim() !== "" && errorMessage !== "") {
            setErrorMessage("Password must be at least 8 characters long.");
        } else {
            setErrorMessage("");
        }
    }

    return (
        <div className="signin_page">
            <div className="signin_container">
                <div className="signin_header">
                    <img src="src\assets\logo.svg" alt="" />
                    <h3>Welcome back!</h3>
                    <p>Don't have an account? <a href="#">Sign up</a></p>
                </div>
                <div>
                    <form className="signin_form" action="">
                        <div className="signin_form_inputbox">
                            <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} autoFocus/>
                            <div className="password_box">
                                <input type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} />
                                <button type="button" className="eye_button" onClick={togglePasswordVisibility}>{showPassword ? <EyeOffIcon className="eye_icon" /> : <EyeIcon className="eye_icon" />}</button>
                            </div>
                            <p className="error_message">{errorMessage}</p>
                        </div>
                        <div className="signin_form_mid">
                            <hr /><span>or</span><hr />
                        </div>
                        <div className="google_box">
                            <button className='signin_button' id="google"><img src="src\assets\google.svg" alt="Google Icon" />Tiếp tục sử dụng dịch vụ bằng Google</button>
                        </div>
                        <button className='signin_button' disabled={!isFormValid}>Log In</button>
                        <a className="forgot_password"href="#">Forgot your password?</a>
                        <a className="need_help" href="#">Need help?</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage