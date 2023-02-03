import classnames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { useContext, useState } from "react";

import { signOut } from "firebase/auth";
import Image from "../Images";
import Button from "../Button";
import ModalUserInfo from "../Modal/ModalUserInfo";

import { auth } from "../../firebase/config";
import { AuthContext } from "./../../context/AuthContext";

const cx = classnames.bind(styles);
function Navbar() {
    const { currentUser } = useContext(AuthContext);
    const [close, setClose] = useState(true);
    const handleClose = () => {
        setClose(true);
    };
    return (
        <div className={cx("wrapper")}>
            <span className={cx("logo")}>My chat app</span>
            <div className={cx("user")}>
                <Image
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                    className={cx("avatar")}
                    onClick={() => setClose(false)}
                />
                <Button className={cx("logout")} onClick={() => signOut(auth)}>
                    Log out
                </Button>
            </div>
            <ModalUserInfo
                isClose={close}
                handleClose={handleClose}
                data={currentUser}
            />
        </div>
    );
}

export default Navbar;
