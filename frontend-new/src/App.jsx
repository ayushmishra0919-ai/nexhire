import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";

function ProtectedRoute({ children }) {
const token = localStorage.getItem("token");
return token ? children : <Navigate to="/login" />;
}

function App() {
return (
  <BrowserRouter>
    <Navbar />

    <Routes>
<Route path="/" element={<Home />} />

```
    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

    <Route path="/jobs" element={<Jobs />} />

    <Route path="/profile" element={<Profile />} />

    <Route path="/post-job" element={<PostJob />} />
  </Routes>
</BrowserRouter>


);
}

export default App;
