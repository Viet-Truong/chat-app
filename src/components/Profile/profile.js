import classnames from "classnames/bind";
import styles from "./Profile.module.scss";

import Image from "../Images";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classnames.bind(styles);
function Profile() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("close")}>
                <FontAwesomeIcon icon={faXmark} className={cx("icon-close")} />
            </div>
            <div className={cx("user")}>
                <Image src={""} className={cx("avatar")} />
                <FontAwesomeIcon icon={""} />
                <h2 className={cx("user-name")}>Viet Truong</h2>
            </div>
            <div className={cx("share-media")}>
                <h3 className={cx("title")}>Shared Media</h3>
                <Image src={""} className={cx("image-share")} />
                <Image src={""} className={cx("image-share")} />
                <Image src={""} className={cx("image-share")} />
            </div>
        </div>
    );
}

export default Profile;
