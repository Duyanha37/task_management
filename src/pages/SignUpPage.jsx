import { useState } from "react"
import EyeOffIcon from "../assets/eye-off.svg?react"
import EyeIcon from "../assets/eye.svg?react"
import "./SignUpPage.css"
import { useNavigate } from "react-router-dom"

function SignUpPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errorUsernameMessage, setErrorUsernameMessage] = useState("")
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("")
    const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState("")
    const isFormValid = username.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "" && errorUsernameMessage === "" && errorPasswordMessage === "" && errorConfirmPasswordMessage === "" && password === confirmPassword;
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)

        if (e.target.value.trim() === "") {
            setErrorUsernameMessage("Tên người dùng là bắt buộc.");
        } else if (!/^[a-zA-Z0-9_]*$/.test(e.target.value)) {
            setErrorUsernameMessage("Username chỉ được chứa chữ cái, số và _.");
        } else {
            setErrorUsernameMessage("");
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)

        if (e.target.value.trim() === "") {
            setErrorPasswordMessage("Mật khẩu là bắt buộc.");
        } else if (/[À-ỹ]/.test(e.target.value)) {
            setErrorPasswordMessage("Mật khẩu không được chứa ký tự có dấu.");
        } else if (/\s/.test(e.target.value)) {
            setErrorPasswordMessage("Mật khẩu không được chứa khoảng trắng.");
        } else if (e.target.value.length < 8 && e.target.value.trim() !== "") {
            setErrorPasswordMessage("Mật khẩu phải có ít nhất 8 ký tự.");
        } else {
            setErrorPasswordMessage("");
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)

        if (e.target.value !== password) {
            setErrorConfirmPasswordMessage("Mật khẩu xác nhận không khớp.");
        } else {
            setErrorConfirmPasswordMessage("");
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleSignUpClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/accounts/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password, confirmPassword })
            });
            const data = await response.json();
            if (response.status === 409) {
                console.error("Username đã tồn tại:", data.error);
                setErrorUsernameMessage(data.error);
            } else if (response.ok) {
                console.log("Đăng ký thành công");
                navigate("/");
            } else {
                console.error("Có lỗi xảy ra:", data.error);
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        }
    }

    const handleSignInClick = () => {
        navigate("/");
    };

    return (
        <div className="signup_page">
            <div className="signup_container">
                <div className="signup_header">
                    <img src="src\assets\logo.svg" alt="" />
                    <h3>Đăng ký</h3>
                    <p>Đã có tài khoản? <a href="#" onClick={handleSignInClick}>Đăng nhập</a></p>
                </div>
                <div>
                    <form className="signup_form" action="" onSubmit={handleSignUpClick}>
                        <div className="signup_form_inputbox">
                            <input type="text" placeholder='Tên người dùng' value={username} onChange={handleUsernameChange} autoFocus />
                            <p className="error_message">{errorUsernameMessage}</p>
                            <div className="password_box">
                                <input type={showPassword ? "text" : "password"} placeholder='Mật khẩu' value={password} onChange={handlePasswordChange} />
                                <button type="button" className="eye_button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <EyeOffIcon className="eye_icon" /> : <EyeIcon className="eye_icon" />}
                                </button>
                            </div>
                            <p className="error_message">{errorPasswordMessage}</p>
                            <div className="confirm_password_box">
                                <input type={showConfirmPassword ? "text" : "password"} placeholder='Xác nhận Mật khẩu' value={confirmPassword} onChange={handleConfirmPasswordChange} />
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
                        <button className='signup_button' disabled={!isFormValid}>Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage