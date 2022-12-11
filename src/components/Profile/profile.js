import classnames from "classnames/bind";
import styles from "./Profile.module.scss";

const cx = classnames.bind(styles);
function Profile() {
    return <div className={cx("wrapper")}>Profile</div>;
}

export default Profile;
