import { useState } from "react"
import EyeOffIcon from "../assets/eye-off.svg?react"
import EyeIcon from "../assets/eye.svg?react"
import "./SignUpPage.css"

function SignUpPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const isFormValid = username.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "";

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className="signup_page">
            <div className="signup_container">
                <div className="signup_header">
                    <img src="src\assets\logo.svg" alt="" />
                    <h3>Welcome back!</h3>
                    <p>Don't have an account? <a href="#">Sign up</a></p>
                </div>
                <div>
                    <form className="signup_form" action="">
                        <div className="signup_form_inputbox">
                            <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} autoFocus />
                            <div className="password_box">
                                <input type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={handlePasswordChange} />
                                <button type="button" className="eye_button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <EyeOffIcon className="eye_icon" /> : <EyeIcon className="eye_icon" />}
                                </button>
                            </div>
                            <div className="confirm_password_box">
                                <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                <button type="button" className="eye_button" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <EyeOffIcon className="eye_icon" /> : <EyeIcon className="eye_icon" />}
                                </button>
                            </div>
                        </div>
                        <button className='signup_button' disabled={!isFormValid}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage