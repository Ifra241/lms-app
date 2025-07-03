import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "antd/dist/reset.css";
import App from './App.tsx'
import { supabase } from "./supabase/supabaseClient";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { message } from "antd";
message.config({
    top: 100,
     duration: 3,
       maxCount: 3,});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <SessionContextProvider supabaseClient={supabase}>
    <App />
    </SessionContextProvider>
  </StrictMode>,
)
