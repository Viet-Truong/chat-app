import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import { useContext, useState } from "react";
import {
    arrayUnion,
    updateDoc,
    doc,
    Timestamp,
    serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

import Button from "../Button";
import { AuthContext } from "./../../context/AuthContext";
import { ChatContext } from "./../../context/ChatContext";
import { db, storage } from "../../firebase/config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Input() {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    const handleSend = async () => {
        if (image) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                (error) => {
                    // setError(true);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            // update profile
                            await updateDoc(doc(db, "chats", data.chatId), {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                }),
                            });
                        }
                    );
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        setText("");
        setImage(null);
    };
    return (
        <div className={cx("wrapper")}>
            <input
                type="text"
                placeholder="Type something ..."
                className={cx("input")}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className={cx("send")}>
                <div className={cx("send-image")}>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="image">
                        <FontAwesomeIcon
                            icon={faImages}
                            className={cx("icon")}
                        />
                    </label>
                </div>
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file">
                    <FontAwesomeIcon icon={faFileAlt} className={cx("icon")} />
                </label>
                <Button
                    type="submit"
                    className={cx("btn-send")}
                    onClick={handleSend}
                >
                    Send
                </Button>
            </div>
        </div>
    );
}

export default Input;
