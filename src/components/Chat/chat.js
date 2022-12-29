import classNames from "classnames/bind";
import styles from "./Chat.module.scss";

import Messages from "./../Messages/messages";
import Input from "../Input/input";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ChatContext } from "./../../context/ChatContext";

const cx = classNames.bind(styles);
function Chat() {
    const { data } = useContext(ChatContext);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h4 className={cx("name-user")}>{data.user?.name}</h4>
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
