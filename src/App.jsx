import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import { createContext, useEffect } from "react";
import Settings from "./pages/Settings";
import Error404 from "./pages/Error404";
import UserProfile from "./pages/UserProfile";
import { useUser } from "./context/UserData";


const username=createContext("")

function App() {
  const {user}=useUser()
  useEffect(() => {
    if (!user) return;

    // Listen to rent requests
    window.socket.on("rent-request", (data) => {
      if (data.ownerUsername === user.username) {
        alert(`New rent request from ${data.requester} for ${data.days} days (₹${data.totalAmount})`);
      }
    });

    // Cleanup on unmount
    return () => {
      window.socket.off("rent-request");
    };
  }, [user]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ✅ Public Routes */}
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
              <MainLayout>
                <Home />
              </MainLayout>
          }
        />
        {/* 🔒 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/user/:username" element={ <ProtectedRoute>
              <MainLayout>
                <UserProfile />
              </MainLayout>
            </ProtectedRoute>} />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddProperty />
              </MainLayout>
            </ProtectedRoute>
          }
        />
   
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Contact />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 🆕 Product Detail Page */}
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProductDetail />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddProperty />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Error404/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
