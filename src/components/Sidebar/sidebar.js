import classnames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import Navbar from "../Navbar/navbar";

const cx = classnames.bind(styles);
function Sidebar() {
    return (
        <div className={cx("wrapper")}>
            <Navbar className={cx("navbar")} />
        </div>
    );
}

export default Sidebar;
