import { useState, useEffect } from 'react'
import './App.css'

function App() {

  return (
    <div className="login_page">
      <div className="login_container">
        <h3 className="login_title">Welcome</h3>
        <form className='login_form'>
          <div className='login_input_box'>
            <input type="text" placeholder='Username' />
          </div>
          <div className='login_input_box' id='password_box'>
            <input type="password" placeholder='Password' />
            <button id='show_password'><svg className='show_icon'></svg></button>
          </div>
          <button className='login_button'>Login</button>
        </form>
      </div>

    </div>
  )
}

export default App
