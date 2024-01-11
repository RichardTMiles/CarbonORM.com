import {useState, useEffect, useCallback} from 'react';
import {Outlet} from 'react-router-dom';

const Main = () => {
    const [isAppLoaded, setIsAppLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsAppLoaded(true);
        }, 1000);
    }, [])

    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return (
                <div className="preloader flex-column justify-content-center align-items-center">
                    <img
                        className="animation__shake"
                        src="/img/logo.png"
                        alt="AdminLTELogo"
                        height={60}
                        width={60}
                    />
                </div>
            );
        }

        return (
            <>

                <div className="content-wrapper">
                    <div className="pt-3"/>
                    <section className="content">
                        <Outlet/>
                    </section>
                </div>
            </>
        );
    }, [isAppLoaded]);

    return <div className="wrapper">{getAppTemplate()}</div>;
};

export default Main;
