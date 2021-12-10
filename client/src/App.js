import NewProject from "./Components/Create-Project/NewProject";
import ExchangeDashboard from "./Components/PurchasingDashboard/ExchangeDashboard";
import ProjectsDashboard from "./Components/ShowcaseProjects/ProjectsDashboard";

import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ExchangeDashboard />}></Route>
        <Route exact path="/create-project" element={<NewProject />}></Route>
        <Route
          exact
          path="/show-projects"
          element={<ProjectsDashboard />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
