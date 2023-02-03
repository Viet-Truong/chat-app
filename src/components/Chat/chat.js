import classNames from "classnames/bind";
import styles from "./Chat.module.scss";

import Messages from "./../Messages/messages";
import Input from "../Input/input";
import Image from "../Images";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ChatContext } from "./../../context/ChatContext";
import Profile from "./../Profile/profile";

const cx = classNames.bind(styles);
function Chat() {
    const { data } = useContext(ChatContext);
    console.log(data);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("info")}>
                    <Image
                        src={data.user?.profile_picture}
                        className={cx("profile_picture")}
                    />
                    <h4 className={cx("name-user")}>{data.user?.name}</h4>
                </div>
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
