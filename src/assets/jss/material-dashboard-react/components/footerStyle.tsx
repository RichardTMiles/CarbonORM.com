import {Styles} from "@material-ui/styles/withStyles/withStyles";
import {
  defaultFont,
  container,
  primaryColor
} from "assets/jss/material-dashboard-react";
import {FloatProperty, FontWeightProperty} from "csstype";

const footerStyle: Styles<any,any> = {
  block: {
    color: "inherit",
    padding: "15px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500" as FontWeightProperty,
    fontSize: "12px"
  },
  left: {
    float: "left !important" as FloatProperty,
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    fontSize: "14px",
    float: "right !important" as FloatProperty
  },
  footer: {
    bottom: "0",
    borderTop: "1px solid #e7e7e7",
    padding: "15px 0",
    ...defaultFont
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  }
};
export default footerStyle;
