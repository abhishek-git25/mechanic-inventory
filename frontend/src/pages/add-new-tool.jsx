import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddNewTool = () => {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: null,
    availableQuantity: 0
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("availableQuantity", formData.availableQuantity);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:3000/api/tools/add-tools", {
        method: "POST",
        body: formDataToSend, // No need for headers when using FormData
      });

      const res = await response.json();

      if (res.success) {
        toast.success("Tool added successfully 🎉");
      } else {
        toast.error(res.message || "Failed to add tool ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error! 🚨");
    }
  };




  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ width: "25rem" }}>
        <h3 className="text-center mb-4">Add New Tool</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3" >
            {/* <label className="form-label">Tool Name</label> */}
            <input type="text" name="name" className="form-control" placeholder="Enter tool name" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            {/* <label className="form-label">Category</label> */}
            <input type="text" name="category" className="form-control" placeholder="Enter category" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            {/* <label className="form-label">Image</label> */}
            <input type="file" name="image" className="form-control" onChange={handleFileChange} required />
          </div>
          <div className="mb-3">
            {/* <label className="form-label">Available Quantity</label> */}
            <input type="number" name="availableQuantity" className="form-control" placeholder="Enter available quantity" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Tool</button>
        </form>
      </div>
    </div>
  )
}

export default AddNewTool
