import classnames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useContext, useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

import Image from "../Images";
import { ChatContext } from "./../../context/ChatContext";

import { faEllipsis, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";

const cx = classnames.bind(styles);
function Profile() {
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    console.log(currentUser);
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("close")}>
                <FontAwesomeIcon icon={faXmark} className={cx("icon-close")} />
            </div>
            <div className={cx("user")}>
                <Image
                    src={data.user?.profile_picture}
                    className={cx("avatar")}
                />
                <FontAwesomeIcon icon={""} />
                <h2 className={cx("user-name")}>{data.user?.name}</h2>
            </div>
            <div className={cx("description")}>
                <h3 className={cx("title")}>Members of Chat </h3>
                <div className={cx("member")}>
                    <Image
                        src={data.user?.profile_picture}
                        className={cx("avatar-member")}
                    />
                    <h2 className={cx("name-member")}>{data.user?.name}</h2>
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        className={cx("more-member")}
                    />
                </div>
                <div className={cx("member")}>
                    <Image
                        src={currentUser.photoURL}
                        className={cx("avatar-member")}
                    />
                    <h2 className={cx("name-member")}>
                        {currentUser.displayName}
                    </h2>
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        className={cx("more-member")}
                    />
                </div>
            </div>
            <div className={cx("share-media")}>
                <h3 className={cx("title")}>Shared Media</h3>
                {messages.map(
                    (m) =>
                        m.img && (
                            <a href={m.img} target="_blank">
                                <Image
                                    src={m.img}
                                    className={cx("image-share")}
                                />
                            </a>
                        )
                )}
            </div>
        </div>
    );
}

export default Profile;
