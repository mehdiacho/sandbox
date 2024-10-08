import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Resizer from "./pages/Resizer";
import Portfolio from "./pages/Portfolio";



function App() {

  return (
              <Routes>
                  <Route index element={<Portfolio />} />
                  <Route path="/rszr" element={<Resizer />} />
                  <Route path="/" element={<Resizer />} />
                  <Route path="*" element={<Resizer />} />
              </Routes>
  );
}


export default App;
