import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/student/Dashboard";
import JobAppChecklist from "./pages/student/JobAppChecklist";
import Resume from './pages/student/Resume';
import ElevatorPitch from "./pages/student/ElevatorPitch";
import PrivateRoute from "./auth/PrivateRoute";
import AuthProvider from './auth/AuthProvider';
import StarsStories from "./pages/student/StarStories";
import Research from "./pages/student/Research";
import Roadmap from "./pages/student/Roadmap";
import ResetPw from "./pages/ResetPw";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset" element={<ResetPw />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/checklist"
              element={
                <PrivateRoute>
                  <JobAppChecklist />
                </PrivateRoute>
              }
            />
            <Route
              path="/resume"
              element={
                <PrivateRoute>
                  <Resume />
                </PrivateRoute>
              }
            />
            <Route
              path="/pitch"
              element={
                <PrivateRoute>
                  <ElevatorPitch />
                </PrivateRoute>
              }
            />
            <Route
              path="/stars"
              element={
                <PrivateRoute>
                  <StarsStories />
                </PrivateRoute>
              }
            />
            <Route
              path="/research"
              element={
                <PrivateRoute>
                  <Research />
                </PrivateRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <PrivateRoute>
                  <Roadmap />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
