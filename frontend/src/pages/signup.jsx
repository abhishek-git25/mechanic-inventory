import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        image: null, // Store selected file
    });

    const navigate = useNavigate()

    const [preview, setPreview] = useState(null); // Store preview image URL

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: file }));

        // Generate preview URL
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreview(imageURL);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("mobile", formData.mobile);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("picture", formData.image); // Make sure this is a File object
      
        try {
          const response = await fetch("http://localhost:3000/api/auth/sign-up", {
            method: "POST",
            body: formDataToSend,
          });
      
          const data = await response.json();
      
          if (data.success) {
            toast.success("Signup Successful! Login Now 🎉");
            navigate("/login");
          } else {
            toast.error(data.message || "Signup Failed! ❌");
          }
        } catch (error) {
          toast.error("Something went wrong ❌");
          console.error("Signup error:", error);
        }
      };
      

    return (
        <div className="d-flex justify-content-center">
            <div className="card p-4" style={{ width: "25rem" }}>
                <h3 className="text-center">Sign Up</h3>

                {/* Profile Picture Preview */}
                <div className="flex jsustify-content-center mb-3">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Profile Preview"
                            className="rounded-circle mx-autp"
                            style={{ width: "100px", height: "100px", objectFit: "cover", marginBottom: "10px" }}
                        />
                    ) : (
                        <div
                            className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                            style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                        >
                            <span className="text-muted">No Image</span>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        {/* <label className="form-label">Full Name</label> */}
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter full name"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label">Email</label> */}
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label">Mobile No.</label> */}
                        <input
                            type="tel"
                            name="mobile"
                            className="form-control"
                            placeholder="Enter mobile number"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label">Password</label> */}
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Create password"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        {/* <label className="form-label">Profile Picture</label> */}
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Sign Up
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
