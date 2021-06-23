import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import AddMaterial from './components/add-material';
import Materials from './components/materials';
import DeleteMaterial from './components/material-delete';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={Materials}/>
        <Route path="/materials" exact component={Materials}/>
        <Route path="/delete-material" exact component={DeleteMaterial}/>
        <Route path="/add-material" exact component={AddMaterial}/>
      </div>
    </Router>
      
  );
}

export default App;
