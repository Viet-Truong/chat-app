import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { useContext, useState } from "react";

import ModalUserInfo from "../Modal/ModalUserInfo";
import Messages from "./../Messages/messages";
import Input from "../Input/input";
import Image from "../Images";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { ChatContext } from "./../../context/ChatContext";

const cx = classNames.bind(styles);
function Chat() {
    const { data } = useContext(ChatContext);
    console.log(data);
    const dataUser = {
        uid: data.user?.uid,
        name: data.user?.name,
        email: data.user?.email,
        image: data.user?.profile_picture,
    };
    const [close, setClose] = useState(true);
    const handleClose = () => {
        setClose(true);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("info")}>
                    <Image
                        src={data.user?.profile_picture}
                        className={cx("profile_picture")}
                        onClick={() => setClose(false)}
                    />
                    <h4 className={cx("name-user")}>{data.user?.name}</h4>
                </div>
                <div className={cx("action")}>
                    <FontAwesomeIcon icon={faVideo} />
                </div>
            </div>
            <Messages />
            <Input />
            <ModalUserInfo
                isClose={close}
                handleClose={handleClose}
                data={dataUser}
            />
        </div>
    );
}

export default Chat;
