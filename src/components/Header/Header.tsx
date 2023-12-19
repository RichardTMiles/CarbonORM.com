import useTheme from "@mui/material/styles/useTheme";
import classNames from "classnames";
import {WithStyles} from "@material-ui/core/styles";
import {WithRouter} from "api/hoc/passPropertiesAndRender";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import HeaderLinks from "components/Header/HeaderLinks";
import Button from "components/CustomButtons/Button";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle";
import CarbonORM from "CarbonORM";
import {PropsWithChildren} from "react";

interface iHeader {
    color: "primary" | "info" | "success" | "warning" | "danger",
    routes: any[],
    location: {},
    handleDrawerToggle: () => void
}

function Header({...props}: PropsWithChildren<WithStyles<typeof headerStyle> & WithRouter & iHeader>) {

    function makeBrand() {
        console.log(props)
        let name = '';
        props.routes.map((prop) => {
            if (prop.path === props.location?.pathname) {
                name = prop.navbarName;
            }
            return null;
        });
        return name;
    }

    const {documentationVersionURI} = CarbonORM.instance.state;

    const {classes, color} = props;

    const appBarClasses = classNames({
        [" " + classes[color]]: color
    });

    const theme = useTheme()

    const mdUp = theme?.breakpoints.up('md') ?? true;
    const smDown = theme?.breakpoints.down('sm');

    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <Button color="transparent" href={"/" + documentationVersionURI + "/#"} className={classes.title}>
                        {makeBrand()}
                    </Button>
                </div>
                {smDown ? null : <HeaderLinks/>}
                {mdUp ? null : <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerToggle}
                >
                    <Menu/>
                </IconButton>}
            </Toolbar>
        </AppBar>
    );
}

export default withStyles(headerStyle)(Header);
