import classnames from "classnames/bind";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import config from "../../config";
import Sidebar from "../../components/Sidebar/sidebar";
import Chat from "../../components/Chat/chat";
import Profile from "../../components/Profile/profile";

const cx = classnames.bind(styles);
function Home() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser) {
            navigate(config.routes.login);
        }
    }, [navigate, currentUser]);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Sidebar />
                <Chat />
                <Profile />
            </div>
        </div>
    );
}

export default Home;
