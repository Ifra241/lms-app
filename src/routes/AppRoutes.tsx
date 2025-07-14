import { Routes,Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CreateCourse from "../pages/CreateCourse";
import MyCourses from "../pages/MyCourses";
import CourseDetail from "../pages/CourseDetail"
import AllCourses from "../pages/AllCourses";
import DashboardHome from "../pages/DashboardHome";
import TeacherDashbord from "../pages/TeacherDashbord";



export default function AppRoutes(){
    return(
        
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/mycourse" element={<MyCourses/>}/>
             <Route path="/mycourse" element={<MyCourses/>}/>
               <Route path="/course-detail/:courseId" element={<CourseDetail/>}/>
              <Route path="/all-courses" element={<AllCourses/>}/>
              <Route path="/enrolledcourses"element={<DashboardHome/>}/>
              <Route path="/chart"element={<TeacherDashbord/>}/>




            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/>  </ProtectedRoute> }>
            <Route index element={<TeacherDashbord/>}/>
            <Route path="enrolledcourses"element={<DashboardHome/>}/>
              <Route path="create-course" element={<CreateCourse />} />
              <Route path="mycourse" element={<MyCourses />} />
              <Route path="course-detail/:courseId" element={<CourseDetail />} />
              <Route path="all-courses" element={<AllCourses />} />
              </Route>


        </Routes>
    );
}