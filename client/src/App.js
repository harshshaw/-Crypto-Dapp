import NewProject from "./Components/Create-Project/NewProject";
import ExchangeDashboard from "./Components/Project-Dashboard/ExchangeDashboard";

import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ExchangeDashboard />}></Route>
        <Route exact path="/new-project" element={<NewProject />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
