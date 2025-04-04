export const token = () => {
    return localStorage.getItem("token");
}

export const user = () => {
    return JSON.parse(localStorage.getItem("user"));
}