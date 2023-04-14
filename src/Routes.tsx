import React from "react"
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Homepage from "./pages/Homepage";
import AboutPage from './pages/About';

function Router() {
  return (
    <Routes>
      <Route path='' element={<MainLayout />}>
        <Route path='' element={<Homepage />} />
        <Route path='about' element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
