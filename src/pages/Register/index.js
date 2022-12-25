import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase/config";

import Button from "../../components/Button";
import Image from "../../components/Images";
// import config from "../../config";
import { Facebook, Google } from "../../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import image from "../../assets/images";

const cx = classNames.bind(styles);
function SignUp() {
    const navigate = useNavigate();
    const inputAvatarRef = useRef();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [file, setFile] = useState();
    const [avatar, setAvatar] = useState(image.addImage);
    const [error, setError] = useState(false);

    const handlePreviewAvatar = (e) => {
        let file = e.target.files[0];
        setFile(file);
        // preview image to interface
        if (!file) return;
        setAvatar(URL.createObjectURL(file));
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const result = createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            console.log("123");
                            //uid undefine
                            await setDoc(doc(db, "users", 2), {
                                uid: 2,
                                name,
                                email,
                                profile_picture: downloadURL,
                            });
                            await updateProfile(result.user, {
                                name,
                                photoURL: downloadURL,
                            });
                        }
                    );
                }
            );
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
                        WELCOME <span>TO CHAT APP</span>
                    </h2>
                    <form className={cx("form")} onSubmit={submit}>
                        <div className={cx("input")}>
                            <label className={cx("label")}>Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>
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
                                onChange={handlePreviewAvatar}
                            />
                        </div>
                        <button className={cx("btn-signup")} onClick={submit}>
                            Sign Up
                        </button>
                        {error && (
                            <span className={cx("error")}>
                                Something went wrong
                            </span>
                        )}
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
