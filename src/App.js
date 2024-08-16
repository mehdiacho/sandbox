import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Resizer from "./PUBLIC/pages/Resizer";



function App() {

  return (
              <Routes>
                  <Route path="/" element={<Resizer />} />
                  <Route path="/" element={<Resizer />} />
                  <Route path="*" element={<Resizer />} />
              </Routes>
  );
}


export default App;
