import classNames from "classnames/bind";
import styles from "./Search.module.scss";

import Image from "../Images";

const cx = classNames.bind(styles);
function Search() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <input
                    type="text"
                    className={cx("search")}
                    placeholder="Find a user"
                />
            </div>
            <div className={cx("user-chat")}>
                <Image src="" className={cx("avatar")} />
                <div className={cx("user-chat-info")}>
                    <span className={cx("user-name")}>Viet Truong</span>
                </div>
            </div>
        </div>
    );
}

export default Search;
