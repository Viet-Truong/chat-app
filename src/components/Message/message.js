import classNames from "classnames/bind";
import styles from "./Message.module.scss";

import Image from "../Images";
import { useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
import { ChatContext } from "./../../context/ChatContext";

const cx = classNames.bind(styles);
function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    return (
        <div className={cx("wrapper-message")}>
            <div className={cx("message", "owner")}>
                <div className={cx("message-info")}>
                    <Image src={""} className={cx("avatar")} />
                </div>
                <div className={cx("message-content")}>
                    <p className={cx("message-p")}>Hello</p>
                </div>
            </div>
        </div>
    );
}

export default Message;
