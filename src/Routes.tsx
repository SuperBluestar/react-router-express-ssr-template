import React from 'react';
import { Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import AboutPage from './pages/About';

function Router() {
  return (
    <Routes>
      <Route path='' element={<Homepage />} />
      <Route path='about' element={<AboutPage />} />
    </Routes>
  );
}

export default Router;
