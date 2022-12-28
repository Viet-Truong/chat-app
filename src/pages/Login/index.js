import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import { auth } from "../../firebase/config";

import { Facebook, Google } from "../../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setError(true);
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner-login")}>
                <div className={cx("background")}></div>
                <div className={cx("wrapper-form")}>
                    <h2 className={cx("title")}>
                        WELCOME <span>BACK</span>
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
                        <div className={cx("des-form")}>
                            <div className={cx("check-remember")}>
                                <input
                                    type="checkbox"
                                    className={cx("checkbox")}
                                />
                                <span className={cx("remember")}>
                                    Remember me
                                </span>
                            </div>
                            <div className={cx("forgot-pass")}>
                                Forgot your password?
                            </div>
                        </div>
                        <Button className={cx("btn-login")} onClick={submit}>
                            Login
                        </Button>
                        <div className={cx("link-sign-up")}>
                            <div className={cx("no-account")}>
                                Haven't an account?
                                <Button
                                    className={cx("sign-up")}
                                    text
                                    to="/register"
                                >
                                    Sign Up
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

export default Login;
