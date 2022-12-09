import config from "../config";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
];

export { publicRoutes };
