
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import AddUser from "./components/AddUser.jsx";
import UserList from "./components/UserList.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to='/'>Add User</Link></li>
            <li><Link to='/users'>Users List</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<AddUser />}/>
          <Route path="/users" element={<UserList />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;