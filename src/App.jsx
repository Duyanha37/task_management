import './App.css';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayouts from './layouts/Mainlayouts';
import Tasks from './pages/Tasks';
import Teams from './pages/Teams';
import Calendar from './pages/Calendar';
import Trash from './pages/Trash';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<MainLayouts />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/trash" element={<Trash />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App