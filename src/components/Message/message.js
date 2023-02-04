import classNames from "classnames/bind";
import styles from "./Message.module.scss";

import Image from "../Images";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "./../../context/AuthContext";
import { ChatContext } from "./../../context/ChatContext";

const cx = classNames.bind(styles);
function Message({ message }) {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const ref = useRef();

    return (
        <div className={cx("wrapper-message")} ref={ref}>
            <div
                className={cx(
                    "message",
                    `${message.senderId === currentUser.uid && "owner"}`
                )}
            >
                <div className={cx("message-info")}>
                    <Image
                        src={
                            message.senderId === currentUser.uid
                                ? currentUser.photoURL
                                : data.user.profile_picture
                        }
                        className={cx("avatar")}
                    />
                </div>
                <div className={cx("message-content")}>
                    <p className={cx("message-p")}>{message.text}</p>
                    {message.img && (
                        <a href={message.img} target="_blank">
                            <Image
                                src={message.img}
                                className={cx("message-img")}
                            />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Message;
