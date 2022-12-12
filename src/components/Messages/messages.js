import classNames from "classnames/bind";
import styles from "./Messages.module.scss";

import Message from "../Message/message";

const cx = classNames.bind(styles);

function Messages() {
    return (
        <div className={cx("wrapper")}>
            <Message />
            <Message />
            <Message />
        </div>
    );
}

export default Messages;
