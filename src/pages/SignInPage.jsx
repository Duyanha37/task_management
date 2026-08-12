import "./SignInPage.css"
import EyeOffIcon from "../assets/eye-off.svg?react"
import EyeIcon from "../assets/eye.svg?react"
import { useState } from "react"
import { AuthContext } from "../contexts/AuthContext.jsx"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)
    const { setAccessToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        handlePasswordErrorMessage(e.target.value)
        setIsFormValid(username.trim() !== "" && e.target.value.trim() !== "" && e.target.value.length >= 8)

    }

    const handlePasswordBlur = () => {
        if (password.trim() === "") {
            setErrorMessage("Password là bắt buộc.");
        } else if (password.length < 8 && password.trim() !== "") {
            setErrorMessage("Password phải có ít nhất 8 ký tự.");
        } else {
            setErrorMessage("");
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handlePasswordErrorMessage = (pass) => {
        if (pass.trim() === "" && errorMessage !== "") {
            setErrorMessage("Password là bắt buộc.");
        } else if (pass.length < 8 && pass.trim() !== "" && errorMessage !== "") {
            setErrorMessage("Password phải có ít nhất 8 ký tự.");
        } else {
            setErrorMessage("");
        }
    }

    const LoginButtonClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/accounts/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Login successful");
                setAccessToken(data.accesstoken);
                navigate("/home");

            } else {
                console.log("Login failed:", data.error);
                setErrorMessage(data.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    function handleSignUpClick() {
        navigate("/signup");
    }

    return (
        <div className="signin_page">
            <div className="signin_container">
                <div className="signin_header">
                    <img src="src\assets\logo.svg" alt="" />
                    <h3>Chào mừng bạn!</h3>
                    <p>Bạn không có tài khoản? <a href="#" onClick={handleSignUpClick}>Đăng ký</a></p>
                </div>
                <div>
                    <form className="signin_form" action="" onSubmit={LoginButtonClick}>
                        <div className="signin_form_inputbox">
                            <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} autoFocus />
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
                        <button className='signin_button' disabled={!isFormValid}>Đăng nhập</button>
                        <a className="forgot_password" href="#">Quên mật khẩu?</a>
                        <a className="need_help" href="#">Cần giúp đỡ?</a>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage