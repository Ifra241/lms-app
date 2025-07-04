import { Routes,Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CreateCourse from "../pages/CreateCourse";
import MyCourses from "../pages/MyCourses";



export default function AppRoutes(){
    return(
        
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/>  </ProtectedRoute> }/>
              <Route path="/create-course" element={<CreateCourse />} />
              <Route path="/mycourse" element={<MyCourses/>}/>
        </Routes>
    );
}