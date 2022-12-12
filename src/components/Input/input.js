import classNames from "classnames/bind";
import styles from "./Input.module.scss";

import Image from "../Images";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Input() {
    return (
        <div className={cx("wrapper")}>
            <input
                type="text"
                placeholder="Type something ..."
                className={cx("input")}
            />
            <div className={cx("send")}>
                <div className={cx("send-image")}>
                    <input type="file" style={{ display: "none" }} id="image" />
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
                <Button type="submit" className={cx("btn-send")}>
                    Send
                </Button>
            </div>
        </div>
    );
}

export default Input;
