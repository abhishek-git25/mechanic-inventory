import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/home';
import Login from '../pages/login';
import Signup from '../pages/signup';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewTool from '../pages/add-new-tool';
import ToolList from '../pages/tool-list';


const RouterComp = () => {



    
    return (
        <div>
            <Router>
                <div>
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/add-tools" element={<AddNewTool />} />
                        <Route path='/tool-list' element={<ToolList />} />

                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default RouterComp
