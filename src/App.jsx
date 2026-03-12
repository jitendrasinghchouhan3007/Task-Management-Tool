import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Layout from "./layouts/Layout";

function App() {

  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser(data);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Routes>

      {/* Login */}
      <Route
        path="/login"
        element={
          user
            ? <Navigate to="/" />
            : <Login onLogin={handleLogin} />
        }
      />

      {/* Layout */}
      <Route
        path="/"
        element={
          user
            ? <Layout user={user} onLogout={handleLogout} />
            : <Navigate to="/login" />
        }
      >

        <Route index element={<Dashboard user={user} />} />

        <Route path="tasks" element={<Tasks user={user} />} />

      </Route>

    </Routes>
  );
}

export default App;