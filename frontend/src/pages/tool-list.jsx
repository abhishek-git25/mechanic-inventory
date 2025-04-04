import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { token, user } from '../utility/data'

const ToolList = () => {

    const [tools, setTools] = useState([])

    const userToken = token();
    const userData = user();

    const navigate = useNavigate()

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        }
    }, [userToken])



    useEffect(() => {
        if (!tools?.length) {
            fetchTools()
        }
    }, [tools])

    const fetchTools = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tools/get-tools");
            const data = await response.json();
            setTools(data);
        } catch (error) {
            toast.error("Failed to fetch tools!");
        }
    };

    const handleIssue = async (toolId) => {

        try {
            const response = await fetch(`http://localhost:3000/api/tools/issue-tool/${toolId}`, {
                method: "POST",
            });

            const res = await response.json();
            if (res.success) {
                toast.success(res.message);
                fetchTools()
            } else {
                toast.error(res.message || "Failed to add tool ❌");
                fetchTools()
            }
        } catch (error) {
            toast.error(error.message || "Network error! 🚨");
        }
    }

    const handleReturn = async (toolId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tools/return-tool/${toolId}`, {
                method: "POST",
            });

            const res = await response.json();
            if (res.success) {
                toast.success(res.message);
                fetchTools()
            } else {
                toast.error(res.message || "Failed ! ❌");
                fetchTools()
            }
        } catch (error) {
            toast.error(error.message || "Network error! 🚨");
        }
    }




    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tools Inventory</h2>
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Available Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tools?.length > 0 ? (
                        tools.map((tool) => (
                            <tr key={tool._id}>
                                <td>{tool.name}</td>
                                <td>{tool.category}</td>
                                <td>
                                    <img src={`http://localhost:3000${tool.image}`}
                                        alt={tool.name} width="50" height="50" />
                                </td>
                                <td>{tool.availableQuantity}</td>
                                <td>
                                    <button className="btn btn-primary me-2" onClick={() => handleIssue(tool._id)}>
                                        Issue
                                    </button>
                                    <button className="btn btn-warning" onClick={() => handleReturn(tool._id)}>
                                        Return
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No tools available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {userData?.admin && (
                <button className="btn btn-primary me-2" onClick={() => navigate('/add-tools')}>
                    Add Tools
                </button>
            )}
        </div>
    )
}

export default ToolList
