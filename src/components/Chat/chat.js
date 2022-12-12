import classNames from "classnames/bind";
import styles from "./Chat.module.scss";

import Messages from "./../Messages/messages";
import Input from "../Input/input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Chat() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h4 className={cx("name-user")}>Viet Truong</h4>
                <div className={cx("action")}>
                    <FontAwesomeIcon icon={faVideo} />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
}

export default Chat;
