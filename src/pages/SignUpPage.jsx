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
    const [errorUsernameMessage, setErrorUsernameMessage] = useState("")
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("")
    const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState("")
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

    const handleUsernameErrorMessage = () => {
        if (username.trim() === "") {
            setErrorUsernameMessage("Username is required.");
        } else {
            setErrorUsernameMessage("");
        }
    };

    const handlePasswordErrorMessage = () => {
        if (password.trim() === "") {
            setErrorPasswordMessage("Password is required.");
        } else if (password.length < 8 && password.trim() !== "") {
            setErrorPasswordMessage("Password must be at least 8 characters long.");
        } else {
            setErrorPasswordMessage("");
        }
    }

    const handleConfirmPasswordErrorMessage = () => {
        if (confirmPassword.trim() === "") {
            setErrorConfirmPasswordMessage("Confirm Password is required.");
        } else if (confirmPassword !== password) {
            setErrorConfirmPasswordMessage("Passwords do not match.");
        } else {
            setErrorConfirmPasswordMessage("");
        }
    };

    return (
        <div className="signup_page">
            <div className="signup_container">
                <div className="signup_header">
                    <img src="src\assets\logo.svg" alt="" />
                    <h3>Sign Up</h3>
                    <p>Already have an account? <a href="#">Sign in</a></p>
                </div>
                <div>
                    <form className="signup_form" action="">
                        <div className="signup_form_inputbox">
                            <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} autoFocus />
                            <p className="error_message">{errorUsernameMessage}</p>
                            <div className="password_box">
                                <input type={showPassword ? "text" : "password"} placeholder='Password' value={password} onChange={handlePasswordChange} />
                                <button type="button" className="eye_button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <EyeOffIcon className="eye_icon" /> : <EyeIcon className="eye_icon" />}
                                </button>
                            </div>
                            <p className="error_message">{errorPasswordMessage}</p>
                            <div className="confirm_password_box">
                                <input type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                <button type="button" className="eye_button" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <EyeOffIcon className="eye_icon" /> : <EyeIcon className="eye_icon" />}
                                </button>
                            </div>
                            <p className="error_message">{errorConfirmPasswordMessage}</p>
                        </div>
                        <div className="signup_form_mid">
                            <hr /><span>or</span><hr />
                        </div>
                        <div className="google_box">
                            <button className='signup_button' id="google"><img src="src\assets\google.svg" alt="Google Icon" />Tiếp tục sử dụng dịch vụ bằng Google</button>
                        </div>
                        <button className='signup_button' disabled={!isFormValid}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage