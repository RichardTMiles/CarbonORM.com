import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import parallaxStyle from "assets/jss/material-kit-react/components/parallaxStyle";
import colorStrip from "assets/img/colorStrip";

const useStyles = makeStyles(parallaxStyle);

interface ParallaxProps {
    className?: string;
    filter?: boolean;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    image?: string;
    small?: boolean;
}

const Parallax: React.FC<ParallaxProps> = (props) => {
    const {className, filter, children, style, image, small} = props;
    const classes = useStyles();

    useEffect(() => {
        let isMounted = true;
        const parallax = document.getElementById('parallax');
        const parallaxContent = document.getElementById('parallaxContent');

        const resetTransform = () => {
            const windowScrollTopSlowed = window.pageYOffset / 2;
            const windowScrollContentOffset = window.pageYOffset / -10;
            if (parallax) {
                parallax.style.transform = `translate3d(0,${windowScrollTopSlowed}px,0)`;
            }
            if (parallaxContent) {
                parallaxContent.style.transform = `translate3d(0,${windowScrollContentOffset}px,0)`;
            }
        };

        window.addEventListener("scroll", resetTransform);


        const runGlow = (): void => {

            let start: number | null = null;

            function step(timestamp: number) {
                if (!isMounted) {
                    return;
                }
                if (!start) {
                    start = timestamp;
                }
                if (null === parallax) {
                    return;
                }
                timestamp /= 5;
                parallax.style.backgroundPosition = `${timestamp}px 38px`;
                setTimeout(() => {
                    window.requestAnimationFrame(step);
                }, 100);
            }

            window.requestAnimationFrame(step);
        };

        runGlow();

        return () => {
            isMounted = false;
            window.removeEventListener("scroll", resetTransform);
        }

    }, []);

    const parallaxClasses = `${classes.parallax} ${filter ? classes.filter : ''} ${small ? classes.small : ''} ${className || ''}`;

    return (
        <div id="parallax" className={parallaxClasses} style={{...style, backgroundImage: `url(${colorStrip})`}}>
            <div
                className={parallaxClasses}
                style={{
                    ...style,
                    backgroundImage: `url(${image})`,
                    width: "100%", // we need % over vw as we regularly zoom out via functions in the header
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                }}
            >
                <div id={"parallaxContent"}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Parallax);
