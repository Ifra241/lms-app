import { createSlice, type PayloadAction} from "@reduxjs/toolkit";

type UserPayload={
    id:string;
    email:string;
    role:'admin'|'teacher'|'student';
     profilePic?: string | null;

};
type AuthState = {
  id: string | null;
  email: string | null;
  role: 'admin' | 'teacher' | 'student' | null;
   profilePic?: string | null;
};

const storedUser=localStorage.getItem("user");


const initialState:AuthState=storedUser?JSON.parse(storedUser)
  :{
    id:null,
    email:null,
    role:null,
          profilePic: null,


};
const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<UserPayload>)=>{
            state.id=action.payload.id;
            state.email=action.payload.email;
            state.role=action.payload.role;
              state.profilePic = action.payload.profilePic || null;
              localStorage.setItem("user", JSON.stringify(state));

        },  
      setRole: (state, action: PayloadAction<'admin' | 'teacher' | 'student'>) => {
      state.role = action.payload;
       
        },
        logout:(state)=>{
            state.id=null;
            state.email=null;
            state.role=null;
              state.profilePic = null;
            localStorage.removeItem("user");

        },
    },
});
export const{setUser,setRole,logout}=authSlice.actions
export default authSlice.reducer;