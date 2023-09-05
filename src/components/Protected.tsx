import { useVerifyQuery } from '../hook/query/verify';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
 const authtoken = localStorage.getItem("token");
 const {loading,data} = useVerifyQuery(authtoken as any);
    if(loading){
        return "Loading............"
    }
 
     return    data ? <Outlet />: <Navigate  to="/login"/>
    
}

export default Protected