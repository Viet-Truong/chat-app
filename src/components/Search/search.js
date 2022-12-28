import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useState, useContext } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/config";
import Image from "../Images";
import { AuthContext } from "./../../context/AuthContext";

const cx = classNames.bind(styles);
function Search() {
    const { currentUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("name", "==", username));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setError(true);
        }
    };
    const handleKeydown = (e) => {
        e.code === "Enter" && handleSearch();
    };
    const handleSelect = async (e) => {
        // check whether the group (chats in firestore) exists, if not create
        const combineID =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combineID));
            if (!res.exists()) {
                // create a chat in chats room
                await setDoc(doc(db, "chats", combineID), {
                    messages: [],
                });
                // create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combineID + ".userInfo"]: {
                        uid: user.uid,
                        name: user.name,
                        profile_picture: user.profile_picture,
                    },
                    [combineID + ".date"]: serverTimestamp(),
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineID + ".userInfo"]: {
                        uid: currentUser.uid,
                        name: currentUser.name,
                        profile_picture: currentUser.profile_picture,
                    },
                    [combineID + ".date"]: serverTimestamp(),
                });
            }
        } catch (err) {
            setUser(null);
            setUsername("");
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <input
                    type="text"
                    className={cx("search")}
                    placeholder="Find a user"
                    onKeyDown={handleKeydown}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            {error && <div>User not found!</div>}
            {user && (
                <div className={cx("user-chat")} onClick={handleSelect}>
                    <div className={cx("user-avatar")}>
                        <Image
                            src={user.profile_picture}
                            className={cx("avatar")}
                        />
                    </div>
                    <div className={cx("user-chat-info")}>
                        <span className={cx("user-name")}>{user.name}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
