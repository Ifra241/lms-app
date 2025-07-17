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
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import StatsCards from "../pages/AdminDashboard/StatsCards";
import AdminCourses from "../pages/AdminDashboard/Courses";
import TeacherSummary from "../pages/AdminDashboard/TeacherSummary";
import StudentSummary from "../pages/AdminDashboard/StudentSummary";


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
              <Route path="/admin"element={<AdminDashboard/>}/>
              <Route path="/stats"element={<StatsCards/>}/>
              <Route path="/courses"element={<AdminCourses/>}/>
              <Route path="/teachers" element={<TeacherSummary/>}></Route>
              <Route path="/students"element={<StudentSummary/>}/>




            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard/>  </ProtectedRoute> }>
            <Route index element={<TeacherDashbord/>}/>
            <Route path="enrolledcourses"element={<DashboardHome/>}/>
              <Route path="create-course" element={<CreateCourse />} />
              <Route path="mycourse" element={<MyCourses />} />
              <Route path="course-detail/:courseId" element={<CourseDetail />} />
              <Route path="all-courses" element={<AllCourses />} />
              </Route>
                            <Route path="admin"element={<AdminDashboard/>}>
                            <Route index element={<StatsCards />} />
                           <Route path="stats"element={<StatsCards/>}/>
                           <Route path="courses"element={<AdminCourses/>}/>
                        <Route path="teachers" element={<TeacherSummary/>}/>
                          <Route path="students"element={<StudentSummary/>}/>


                            
                            </Route>



        </Routes>
    );
}