import classNames from 'classnames/bind';
import styles from './ListChat.module.scss';
import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '../../firebase/config';
import Image from '../Images';
import { AuthContext } from './../../context/AuthContext';
import { ChatContext } from './../../context/ChatContext';

const cx = classNames.bind(styles);
function ListChat() {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unSub = onSnapshot(
                doc(db, 'userChats', currentUser.uid),
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

    const handleSelect = (u) => {
        dispatch({ type: 'CHANGE_USER', payload: u });
    };
    return (
        <div className={cx('wrapper')}>
            {/* use sort to sort user chat recently */}
            {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                    <div
                        className={cx('user-chat')}
                        key={chat[0]}
                        onClick={() => handleSelect(chat[1].userInfo)}
                    >
                        <div className={cx('user-avatar')}>
                            <Image
                                src={chat[1].userInfo.profile_picture}
                                className={cx('avatar')}
                            />
                        </div>
                        <div className={cx('user-chat-info')}>
                            <p className={cx('user-name')}>
                                {chat[1].userInfo.name}
                            </p>
                            <p className={cx('user-last-chat')}>
                                {chat[1].lastMessage?.text}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default ListChat;
