import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { auth } from "./config/firebase"
import { Login } from "./components/login"
import { ReactNode } from "react";
import { Register } from "./components/register";
import {Home} from "./components/Home"
function App() {
  const PrivateRoute = ({ children }:{children:ReactNode}) => {
    const { currentUser } = auth;
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  </BrowserRouter>
  )
}

export default App
