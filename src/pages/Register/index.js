import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Image from "../../components/Images";
// import { authRegister } from "../../redux/authAction";
// import config from "../../config";
import { Facebook, Google } from "../../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/images";

const cx = classNames.bind(styles);
function SignUp() {
    // const { auth } = useSelector((state) => state.auth);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const inputAvatarRef = useRef();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [avatar, setAvatar] = useState(image.addImage);
    // useEffect(() => {
    //     if (auth) {
    //         navigate(config.routes.home);
    //     }
    // }, [navigate, auth]);

    const handlePreviewAvatar = (e) => {
        let file = e.target.files[0];
        if (!file) return;
        setAvatar(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        // dispatch(authRegister({ email, password }));
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner-login")}>
                <div className={cx("background")}></div>
                <div className={cx("wrapper-form")}>
                    <h2 className={cx("title")}>
                        WELCOME <span>TO CHAT APP</span>
                    </h2>
                    <form className={cx("form")}>
                        <div className={cx("input")}>
                            <label className={cx("label")}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className={cx("input")}>
                            <label className={cx("label")}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className={cx("input")}>
                            <label className={cx("label")} htmlFor="avatar">
                                <Image
                                    src={avatar}
                                    className={cx("icon-add-image")}
                                />
                                Add your avatar
                            </label>
                            <input
                                ref={inputAvatarRef}
                                style={{ display: "none" }}
                                id="avatar"
                                type="file"
                                // value={password}
                                onChange={handlePreviewAvatar}
                                // placeholder="Enter your password"
                            />
                        </div>
                        <button className={cx("btn-signup")} onClick={submit}>
                            Sign Up
                        </button>
                        <div className={cx("link-sign-in")}>
                            <div className={cx("no-account")}>
                                Have an account?
                                <Button
                                    className={cx("sign-in")}
                                    to="/login"
                                    text
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                        <div className={cx("social")}>
                            <Button
                                leftIcon={<Facebook />}
                                rightIcon={
                                    <FontAwesomeIcon icon={faArrowRight} />
                                }
                                text
                                className={cx("social-btn")}
                            >
                                Login with Facebook
                            </Button>
                            <Button
                                leftIcon={<Google />}
                                rightIcon={
                                    <FontAwesomeIcon icon={faArrowRight} />
                                }
                                text
                                className={cx("social-btn")}
                            >
                                Login with Google
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
