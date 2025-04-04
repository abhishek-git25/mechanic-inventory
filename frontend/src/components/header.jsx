import { LogOut } from "lucide-react";

const Header = () => {

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }


    return (
        <header className="d-flex justify-content-between px-4 py-3 bg-blue-600  shadow-lg mb-4">
            <div>
                <h1 className="text-xl font-semibold">Tool Management System</h1>
            </div>
            <button
                onClick={logout}
                className="btn btn-danger items-center gap-2 bg-red-500 px-4 p-1 rounded-md hover:bg-red-600 transition"
            >
                <LogOut size={20} />
       
            </button>
        </header>
    );
};

export default Header;
