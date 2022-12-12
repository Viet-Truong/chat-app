import classNames from "classnames/bind";
import styles from "./ListChat.module.scss";

import Image from "../Images";

const cx = classNames.bind(styles);
function ListChat() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("user-chat")}>
                <div className={cx("user-avatar")}>
                    <Image src="" className={cx("avatar")} />
                </div>
                <div className={cx("user-chat-info")}>
                    <p className={cx("user-name")}>Viet Truong</p>
                    <p className={cx("user-last-chat")}>Hello</p>
                </div>
            </div>
        </div>
    );
}

export default ListChat;
