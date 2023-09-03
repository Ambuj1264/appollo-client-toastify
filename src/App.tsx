import React from "react";
import Routers from "./Router/Route";
import { ToastContainer } from "react-toastify";
// import First from "./components/First";
import 'react-toastify/dist/ReactToastify.css';
const App: React.FC = () => {
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
 
<ToastContainer />
     <Routers></Routers>
    </>
  );
};

export default App;
