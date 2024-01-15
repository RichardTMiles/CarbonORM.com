import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HeaderTop from "pages/Documentation/HeaderTop/HeaderTop";

import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle";

import {NavLink} from "react-router-dom";


class Navbar extends React.Component {
    render() {
        const {classes, routes} = this.props;

        let tabs = routes;

        tabs = tabs.map((o, key) => {
            return (<ListItem className={classes.listItem}>
                <NavLink
                    to={o.path}
                    className={classes.navLink + " " + classes.navLinkActive}
                    key={key}
                >

                        {o.name}
                </NavLink>
            </ListItem>)
        });

        return (
            <div className={classes.section}>
                <div className={classes.container}>
                    <HeaderTop
                        brand="Documentation"
                        color="info"
                        rightLinks={
                            <List className={classes.list}>
                                {tabs}
                            </List>
                        }
                    />

                </div>
            </div>
        );
    }
}

export default withStyles(navbarsStyle)(Navbar);
