// App.js
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
 // Import the ErrorBoundary component
import ErrorBoundary from "./pages/Errorboundry";

const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const AddTodo = lazy(() => import("./pages/AddTodo"));
const Logout = lazy(() => import("./pages/Logout"));
const TodoList = lazy(() => import("./pages/TodoList"));
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
       
            <Routes>
              <Route path="/" element={<Home />} />
             <Route path="/addtodo" element={<AddTodo />} />
             <Route path="/todolist" element={<TodoList />}/>
              <Route path="/logout" element={<Logout />} /> 
              <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
           
            
           
            
          </Routes>
        
            
        </Suspense>
      </ErrorBoundary>

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
      />
    </>
  );
} 

export default App;


