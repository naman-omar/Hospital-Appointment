
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Messages from "./components/Messages";
import DoctorDetails from "./components/DoctorDetails";
import Doctors from "./components/Doctors";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/SideBar";
import AddNewAdmin from "./components/AddNewAdmin";
import Home from "./components/Home";
import "./App.css";
import "./index.css";

const App = () => {

  return (
    <Router>
      <Sidebar />
      <ToastContainer theme="dark" position='top-right' autoClose={3000} closeOnClick pauseOnHover={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/Dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/doctors/:id" element={<DoctorDetails />}></Route>
        <Route path="/admin/doctors" element={<Doctors />} />
      </Routes>
    </Router>
  );
};

export default App;