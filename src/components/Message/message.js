import classNames from "classnames/bind";
import styles from "./Message.module.scss";

import Image from "../Images";

const cx = classNames.bind(styles);
function Message() {
    return (
        <div className={cx("wrapper-message")}>
            <div className={cx("message", "owner")}>
                <div className={cx("message-info")}>
                    <Image src={""} className={cx("avatar")} />
                    <span className={cx("message-time")}>Just now</span>
                </div>
                <div className={cx("message-content")}>
                    <p className={cx("message-p")}>Hello</p>
                </div>
            </div>
        </div>
    );
}

export default Message;
