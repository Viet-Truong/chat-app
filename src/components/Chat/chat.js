import classNames from "classnames/bind";
import styles from "./Chat.module.scss";

const cx = classNames.bind(styles);
function Chat() {
    return <div className={cx("wrapper")}>Chat</div>;
}

export default Chat;
