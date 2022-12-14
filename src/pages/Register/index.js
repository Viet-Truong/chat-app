import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase/config";

import Button from "../../components/Button";
import Image from "../../components/Images";
import image from "../../assets/images";

import { Facebook, Google } from "../../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function SignUp() {
    const navigate = useNavigate();
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
            const result = await createUserWithEmailAndPassword(
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
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            // update profile
                            await updateProfile(result.user, {
                                displayName: name,
                                photoURL: downloadURL,
                            });
                            // create user on firestore
                            await setDoc(doc(db, "users", result.user.uid), {
                                uid: result.user.uid,
                                name,
                                email,
                                password,
                                profile_picture: downloadURL,
                            });
                            // create empty user chats on firestore
                            await setDoc(
                                doc(db, "userChats", result.user.uid),
                                {}
                            );
                            navigate("/");
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
