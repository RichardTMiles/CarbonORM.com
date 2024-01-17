import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import parallaxStyle from "assets/jss/material-kit-react/components/parallaxStyle";
import colorStrip from "assets/img/colorStrip";

interface ParallaxProps extends WithStyles<typeof parallaxStyle> {
    className?: string;
    filter?: boolean;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    image?: string;
    small?: boolean;
}

const Parallax: React.FC<ParallaxProps> = (props) => {
    const [transform, setTransform] = useState<string>("translate3d(0,0px,0)");

    const resetTransform = (): void => {
        const windowScrollTop: number = window.pageYOffset / 3;
        setTransform(`translate3d(0,${windowScrollTop}px,0)`);
    };

    useEffect(() => {
        let isMounted = true;
        const windowScrollTop: number = window.pageYOffset / 3;
        setTransform(`translate3d(0,${windowScrollTop}px,0)`);

        window.addEventListener("scroll", resetTransform);
        const runGlow = (): void => {

            const header = document.getElementById('colorStrip');

            if (null === header) {

                return;

            }

            let start: number | null = null;

            const element = header;

            function step(timestamp: number) {
                if (!isMounted) {
                    return;
                }
                if (!start) {
                    start = timestamp;
                }
                timestamp /= 10;
                element.style.backgroundPosition = `${timestamp}px 38px`;
                setTimeout(() => {
                    window.requestAnimationFrame(step);
                }, 100);
            }

            window.requestAnimationFrame(step);
        };

        runGlow();

        return () => {
            window.removeEventListener("scroll", resetTransform);
            isMounted = false;
        };
    }, []);

    const {
        classes,
        filter,
        className,
        children,
        style,
        image,
        small
    } = props;

    const parallaxClasses = classNames({
        [classes.parallax]: true,
        [classes.filter]: filter,
        [classes.small]: small,
        [className || ""]: className !== undefined
    });

    return (
        <div id={'colorStrip'} className={parallaxClasses} style={{...style, backgroundImage: `url(${colorStrip})`, transform}}>
            <div
                className={parallaxClasses}
                style={{
                    ...style,
                    backgroundImage: `url(${image})`,
                    width: "100vw",
                    height: "100vh",
                    objectFit: "cover",
                    objectPosition: "center"
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default withStyles(parallaxStyle)(Parallax);
