import classNames from "classnames/bind";
import styles from "./Messages.module.scss";

import Message from "../Message/message";
import { useContext } from "react";
import { ChatContext } from "./../../context/ChatContext";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const cx = classNames.bind(styles);

function Messages() {
    const { data } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });
        return () => unSub();
    }, [data.chatId]);
    return (
        <div className={cx("wrapper")}>
            {messages.map((m) => (
                <Message Message={m} key={m.id} />
            ))}
        </div>
    );
}

export default Messages;
