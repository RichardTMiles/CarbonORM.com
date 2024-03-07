// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle";
import PackageJson from "package.json";
import {Link} from "react-router-dom";

function Footer({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to="/" className={classes.block}>
                Home
              </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.miles.systems/" className={classes.block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.miles.systems/blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {(new Date()).getUTCFullYear()}{" "}
            <a href="https://www.miles.systems" className={classes.a}>
              Richard T Miles
            </a>, you are using the {process.env.NODE_ENV === 'development' ? 'development' : 'live'} frontend version ({PackageJson.version}). Awesome stuff :)
          </span>
        </p>
      </div>
    </footer>
  );
}

export default withStyles(footerStyle)(Footer);
