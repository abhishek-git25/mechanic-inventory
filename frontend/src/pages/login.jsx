import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../context/authContext';
const Login = () => {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    const { setIsLogin } = useAuth()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        console.log("submit", formData);

        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,

            }),


        });

        const data = await response.json();

        if (data.success) {
            toast.success("Login Successfull 🎉");
            localStorage.setItem("token", data.data.token); // Store token in local storage
            localStorage.setItem("user", JSON.stringify({
                name: data.data.name,
                email: data.data.email,
                admin: data.data.admin,
            }));
            setIsLogin(true); // Set login state to true
            navigate("/tool-list"); // Redirect to home page after successful login

        } else {
            toast.error(data.message || "Signup Failed! ❌"); // Error Toast
        }

    };


    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card p-4" style={{ width: "25rem" }}>
                <h3 className="text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" name="email" className="form-control" placeholder="Enter email" required onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" className="form-control" placeholder="Enter password" required onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>

    )
}

export default Login
