import FetchMarkdownWithGrid from "pages/UI/MaterialUI/components/FetchMarkdown/FetchMarkdownWithGrid";
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import completedStyle from "assets/jss/material-kit-react/views/componentsSections/completedStyle";

export const LICENSE = 'license/';

function License() {
    return <FetchMarkdownWithGrid url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/license.md'}/>
}

export default withStyles(completedStyle)(License);
