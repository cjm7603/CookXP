import { useState } from 'react'
import Login  from "./pages/Login";
import Signup  from "./pages/Signup";
import Welcome from "./pages/Welcome"; 
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App;
