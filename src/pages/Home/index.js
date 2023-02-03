import classnames from "classnames/bind";
import styles from "./Home.module.scss";

import ModalUserInfo from "../../components/Modal/ModalUserInfo";
import Sidebar from "../../components/Sidebar/sidebar";
import Chat from "../../components/Chat/chat";
import Profile from "../../components/Profile/profile";

const cx = classnames.bind(styles);
function Home() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <Sidebar />
                <Chat />
                <Profile />
                <ModalUserInfo />
            </div>
        </div>
    );
}

export default Home;
