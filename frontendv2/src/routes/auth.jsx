import { NavLink } from 'react-router-dom';
import axios from "axios"
const checkAuth = () => {
    const TOKEN = localStorage.getItem("token");
    const PUBLIC_ROUTES = ["login", "-password", "register", "documentation"];

    const isPublicPage = PUBLIC_ROUTES.some(r => window.location.href.includes(r));

    if (!TOKEN && !isPublicPage) {
        // ใช้ NavLink ในการนำทางไปยังหน้า "/login" แทนการใช้ window.location.href
        return <NavLink to="/login" />;
    } else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

        axios.interceptors.request.use(function (config) {
            // UPDATE: Add this code to show global loading indicator
            document.body.classList.add('loading-indicator');
            return config
        }, function (error) {
            return Promise.reject(error);
        });

        axios.interceptors.response.use(function (response) {
            // UPDATE: Add this code to hide global loading indicator
            document.body.classList.remove('loading-indicator');
            return response;
        }, function (error) {
            document.body.classList.remove('loading-indicator');
            return Promise.reject(error);
        });
        return TOKEN;
    }
}

export default checkAuth;
