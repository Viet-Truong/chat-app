import classNames from "classnames/bind";
import styles from "./ModalUserInfo.module.scss";

import Image from "../../Images";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Modal({ handleClose, isClose }) {
    const toggleClose = isClose ? "close" : "";
    return (
        <div className={cx("modal", `${toggleClose}`)}>
            <div className={cx("wrapper-modal")}>
                <div className={cx("inner-modal")}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={cx("icon-close")}
                        onClick={handleClose}
                    />
                    <div className={cx("content")}>
                        <Image src={""} className={cx("avatar")} />
                        <div className={cx("info")}>
                            <p className={cx("uid")}>
                                UID:
                                <span className={cx("text")}>123132123</span>
                            </p>
                            <p className={cx("name")}>
                                Name:
                                <span className={cx("text")}>Truong</span>
                            </p>
                            <p className={cx("email")}>
                                Email:
                                <span className={cx("text")}>
                                    viettrung@gmail.com
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
