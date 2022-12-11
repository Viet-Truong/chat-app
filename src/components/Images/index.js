import { forwardRef, useState } from "react";
import images from "../../assets/images";
import classnames from "classnames";
import styles from "./Image.module.scss";

const Image = forwardRef(
    (
        {
            fallback: customFallback = images.noImage,
            src,
            alt,
            className,
            ...props
        },
        ref
    ) => {
        const [fallback, setFallback] = useState("");
        const handleError = () => {
            setFallback(customFallback);
        };
        return (
            <img
                className={classnames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src}
                alt={alt}
                {...props}
                onError={handleError}
            />
        );
    }
);

export default Image;
