import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "../Store/Store";



const ProtectAdminRoute=({children}:{children:ReactNode})=>{
    const user=useSelector((state:RootState)=>state.auth);

    const isAdmin=user.role==="admin"||user.email==="admin@example.com";
    if(!isAdmin){
        return <Navigate to="/"/>
    }
    return<>{children}</>
}
export default ProtectAdminRoute;