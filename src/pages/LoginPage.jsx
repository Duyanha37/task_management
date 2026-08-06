import "./LoginPage.css"

function LoginPage() {
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
                            <input type="password" placeholder='Password' />
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