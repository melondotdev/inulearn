import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/landing/Home";
import Login from "./pages/landing/Login";
import SignUp from "./pages/landing/SignUp";
import MyCourses from "./pages/student/MyCourses";
import Dashboard from "./pages/student/templates/Dashboard";
import JobAppChecklist from "./pages/student/templates/JobAppChecklist";
import Resume from './pages/student/templates/Resume';
import ElevatorPitch from "./pages/student/templates/ElevatorPitch";
import PrivateRoute from "./auth/PrivateRoute";
import AuthProvider from './auth/AuthProvider';
import StarsStories from "./pages/student/templates/StarStories";
import Research from "./pages/student/templates/Research";
import Roadmap from "./pages/student/templates/Roadmap";
import Profile from "./pages/student/templates/Profile";
import ResetPw from "./pages/landing/ResetPw";
import Booking from "./pages/student/Booking";

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
              path="/courses"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <MyCourses />
                </PrivateRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <Booking />
                </PrivateRoute>
              }
            />
            <Route
              path="/npc-jita/dashboard"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/npc-jita/checklist"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <JobAppChecklist />
                </PrivateRoute>
              }
            />
            <Route
              path="/npc-jita/resume"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <Resume />
                </PrivateRoute>
              }
            />
            <Route
              path="/npc-jita/pitch"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <ElevatorPitch />
                </PrivateRoute>
              }
            />
            <Route
              path="/npc-jita/stars"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <StarsStories />
                </PrivateRoute>
              }
            />
            <Route
              path="/npc-jita/research"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <Research />
                </PrivateRoute>
              }
            />
            <Route
              path="/npc-jita/roadmap"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <Roadmap />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute allowedRoles={['student', 'teacher']}>
                  <Profile />
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
