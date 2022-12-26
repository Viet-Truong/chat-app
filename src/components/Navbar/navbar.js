import classnames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { signOut } from "firebase/auth";

import Image from "../Images";
import Button from "../Button";

const cx = classnames.bind(styles);
function Navbar() {
    return (
        <div className={cx("wrapper")}>
            <span className={cx("logo")}>My chat app</span>
            <div className={cx("user")}>
                <Image src="" alt="" className={cx("avatar")} />
                <Button className={cx("logout")} onClick={() => signOut()}>
                    Log out
                </Button>
            </div>
        </div>
    );
}

export default Navbar;
