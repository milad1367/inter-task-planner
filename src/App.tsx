import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./app/Home";
import { SingleTaskForm } from "./features/tasks/SingleTaskForm";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Home />}>
            <Route path=":taskId" element={<SingleTaskForm />}></Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
