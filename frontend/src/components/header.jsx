import { LogOut } from "lucide-react";

const Header = () => {

    const userData = JSON.parse(localStorage.getItem("user")) || null;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    const navigate = () => {
        window.location.href = "/tool-list";
    }

    console.log(`http://localhost:3000${userData.pcicture}`);
    


    return (
        <header className="d-flex justify-content-between px-4 py-3 bg-blue-600 shadow-lg mb-4 items-center">
            <div>
                <h1
                    className="text-xl font-semibold text-white"
                    style={{ cursor: "pointer" }}
                    onClick={navigate}
                >
                    Tool Management System
                </h1>
            </div>

            <div className="d-flex align-items-center gap-3">
                {/* Profile Image */}
                <img
                    src={`http://localhost:3000${userData.pcicture}`|| "https://tse1.mm.bing.net/th?id=OIP.yhqkR9B2hKbtwwZ8bPNbQQHaHw&pid=Api"} // fallback image
                    alt="Profile"
                    className="rounded-full border border-white"
                    style={{ width: "40px", height: "40px", objectFit: "cover",borderRadius: "50%" }}
                />

                {/* Logout Button */}
                <button
                    onClick={logout}
                    className="btn btn-danger d-flex align-items-center gap-2 bg-red-500 px-4 p-1 rounded-md hover:bg-red-600 transition"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>

    );
};

export default Header;
