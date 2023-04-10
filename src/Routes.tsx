import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import AboutPage from './pages/About';

function Router() {
  return (
    // <HomePage {...props} />
    <Routes>
      <Route path='' element={<Homepage />} />
      <Route path='about' element={<AboutPage />} />
    </Routes>
  );
}

export default Router;
