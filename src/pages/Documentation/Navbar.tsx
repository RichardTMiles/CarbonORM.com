
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import classNames from "classnames";
import HeaderTop from "pages/Documentation/HeaderTop/HeaderTop";
import CustomDropdown from "pages/UI/MaterialUI/components/CustomDropdown/CustomDropdown";

import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle";

import {NavLink} from "react-router-dom";


function isCurrentlyActive(url: string) {
    console.log('isCurrentlyActive',url, window.location.pathname, window.location.hash);
    return window.location.pathname === url || window.location.hash === url + '/';

}

function Navbar(props) {
    const {classes, routes, color, brand} = props;

    let tabs: any[] = [];

    routes.forEach((o, key) => {
            // 'pathTo' aka not a redirect
            if (('pathTo' in o)) {
                return;
            }
            // doesn't need a sub menu
            if (!('views' in o)) {
                tabs.push(<ListItem className={classes.listItem} key={key}>
                    <NavLink
                        to={o.path.replace(/\*$/, '')}
                        className={classes.navLink + " " + classes.navLinkActive}
                        key={key}
                    >
                        {o.name}
                    </NavLink>
                </ListItem>)
                return;
            }

            tabs.push(
                <ListItem className={classes.listItem} key={key}>
                    <CustomDropdown
                        left
                        key={key}
                        caret={true}
                        hoverColor="info"
                        dropdownHeader={o.name}
                        buttonText={o.name}
                        buttonProps={{
                            className: classes.navLink + " ",
                        }}
                        dropdownList={o.views.map((m, key2) => {
                            return <ListItem className={classes.listItem} key={key2}>
                                <NavLink
                                    to={m.path}
                                    className={classNames(classes.navLink, {
                                        [classes.navLinkActive]: isCurrentlyActive(m.path)
                                    })}
                                    key={key2}
                                >
                                    {m.name}
                                </NavLink>
                            </ListItem>
                        })}
                    />
                </ListItem>
            );

        }
    );


    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <HeaderTop
                    darkMode={props.darkMode}
                    brand={brand ? brand : "Documentation"}
                    color={color ? color : "dark"}
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

export default withStyles(navbarsStyle)(Navbar);


// thur feb 21 1140