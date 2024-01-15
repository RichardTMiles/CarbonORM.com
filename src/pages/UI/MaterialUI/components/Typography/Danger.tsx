import {WithStyles} from "@material-ui/core/styles";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle";
import {PropsWithChildren} from "react";

function Danger({ ...props }: PropsWithChildren<WithStyles<typeof typographyStyle>>) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.dangerText}>
      {children}
    </div>
  );
}


export default withStyles<any,any, PropsWithChildren>(typographyStyle)(Danger);
