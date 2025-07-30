import { Routes,Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AccessRoute from "./ProtectedRoute";
import CreateCourse from "../pages/CreateCourse";
import MyCourses from "../pages/MyCourses";
import CourseDetail from "../pages/CourseDetail"
import AllCourses from "../pages/AllCourses";
import DashboardHome from "../pages/StudyCourses";
import TeacherDashbord from "../pages/TeacherDashbord";
import StatsCards from "../pages/AdminDashboard/StatsCards";
import AdminCourses from "../pages/AdminDashboard/Courses";
import TeacherSummary from "../pages/AdminDashboard/TeacherSummary";
import StudentSummary from "../pages/AdminDashboard/StudentSummary";
import ProfileDetailPage from "../pages/ProfileDetailPage";
import ProtectAdminRoute from "./ProtectAdminRoute";



export default function AppRoutes(){
    return(
        
        <Routes>
            <Route path="/" element={ <AccessRoute onlyPublic><Login/> </AccessRoute>}/>
            <Route path="/signup" element={<AccessRoute onlyPublic><Signup/> </AccessRoute>}/>





            <Route path="/dashboard" element={<AccessRoute requireAuth><Dashboard/>  </AccessRoute> }>
            <Route index element={<TeacherDashbord/>}/>
            <Route path="enrolledcourses"element={<DashboardHome/>}/>
              <Route path="create-course" element={<CreateCourse />} />
              <Route path="mycourse" element={<MyCourses />} />
              <Route path="course-detail/:courseId" element={<CourseDetail />} />
              <Route path="all-courses" element={<AllCourses />} />
                 <Route path="profile-detail" element={<ProfileDetailPage />} />

              </Route>
                            <Route path="admin"element={<ProtectAdminRoute><Dashboard/></ProtectAdminRoute>}>
                            <Route index element={<StatsCards />} />
                           <Route path="stats"element={<StatsCards/>}/>
                           <Route path="courses"element={<AdminCourses/>}/>
                        <Route path="teachers" element={<TeacherSummary/>}/>
                          <Route path="students"element={<StudentSummary/>}/>


                            
                            </Route>



        </Routes>
    );
}