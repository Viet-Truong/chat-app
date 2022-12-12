import classnames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import Navbar from "../Navbar/navbar";
import Search from "../Search/search";
import ListChat from "../ListChat/listChat";

const cx = classnames.bind(styles);
function Sidebar() {
    return (
        <div className={cx("wrapper")}>
            <Navbar className={cx("navbar")} />
            <Search />
            <ListChat />
        </div>
    );
}

export default Sidebar;
