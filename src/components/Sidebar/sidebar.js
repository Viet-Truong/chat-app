import classnames from "classnames/bind";
import styles from "./Sidebar.module.scss";

import Navbar from "../Navbar/navbar";
import Search from "../Search/search";
import ListChat from "../ListChat/listChat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersRectangle } from "@fortawesome/free-solid-svg-icons";

const cx = classnames.bind(styles);
function Sidebar() {
    return (
        <div className={cx("wrapper")}>
            <Navbar className={cx("navbar")} />
            <Search />
            <ListChat />
            <div className={cx("newGroup")}>
                <FontAwesomeIcon icon={faUsersRectangle} />
                <p>Add a new group conversation</p>
            </div>
        </div>
    );
}

export default Sidebar;
