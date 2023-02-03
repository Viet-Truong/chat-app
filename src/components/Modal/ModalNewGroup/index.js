import classNames from "classnames/bind";
import styles from "./ModalNewGroup.module.scss";

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
                    <h2 className={cx("modal-title")}>LOGIN TIKTOK</h2>
                    <div className={cx("content")}></div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
