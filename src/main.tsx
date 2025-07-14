import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "antd/dist/reset.css";
import App from './App.tsx'
import { supabase } from "./supabase/supabaseClient";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Provider } from "react-redux";
import { store } from './store.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <SessionContextProvider supabaseClient={supabase}>
      <Provider store={store}>
    <App />
    </Provider>
    </SessionContextProvider>
  </StrictMode>,
)
