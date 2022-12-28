import classNames from "classnames/bind";
import styles from "./ListChat.module.scss";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase/config";
import Image from "../Images";
import { AuthContext } from "./../../context/AuthContext";

const cx = classNames.bind(styles);
function ListChat() {
    const { currentUser } = useContext(AuthContext);
    const [chats, setChats] = useState();

    useEffect(() => {
        const getChats = () => {
            const unSub = onSnapshot(
                doc(db, "userChats", currentUser.uid),
                (doc) => {
                    setChats(doc.data());
                }
            );
            return () => {
                unSub();
            };
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);
    return (
        <div className={cx("wrapper")}>
            {Object.entries(chats).map((chat) => {
                <div className={cx("user-chat")} key={chat[0]}>
                    <div className={cx("user-avatar")}>
                        <Image
                            src={chat[1].userInfo.profile_picture}
                            className={cx("avatar")}
                        />
                    </div>
                    <div className={cx("user-chat-info")}>
                        <p className={cx("user-name")}>
                            {chat[1].userInfo.name}
                        </p>
                        <p className={cx("user-last-chat")}>
                            {chat[1].userInfo.lastMessage.text}
                        </p>
                    </div>
                </div>;
            })}
        </div>
    );
}

export default ListChat;
