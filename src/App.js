import React, { useState, createContext } from "react";
import OnBoardForm from "./Components/OnBoardForm";
import SalonSearch from "./Components/SalonSearch";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SlotGeneration } from "./Components/SlotGeneration";
import AllSalonslist from "./Components2/AllSalonslist";

export const Store = createContext();

function App() {
  const [isAuth, setisAuth] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Store.Provider value={[isAuth, setisAuth]}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <OnBoardForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SalonSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/slots"
              element={
                <ProtectedRoute>
                  <SlotGeneration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/salon-lists"
              element={
                <ProtectedRoute>
                  <AllSalonslist />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Store.Provider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
