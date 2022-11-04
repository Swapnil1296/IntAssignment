

import { Route, Routes } from 'react-router-dom';
import './App.css';

import Combine from './component/Combined';
import PrivateRoute from './login/PrivateRoute'
import Login from "./login/Login";
import Dashboard from "./login/Dashboard";
import NavbarforHeader from './login/Navbar';

function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<NavbarforHeader />} />
          <Route path="/card" element={<Combine />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
