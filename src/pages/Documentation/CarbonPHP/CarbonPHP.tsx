import Grid from "@material-ui/core/Grid";
import FetchMarkdown from "components/FetchMarkdown/FetchMarkdown";
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import {
    AccountTree,
    AllInclusive,
    Announcement,
    Dashboard,
    Exposure,
    Power,
    RecentActors,
    Restaurant,
    RestorePage,
    Storage,
    Timeline,
    ViewComfy
} from "@material-ui/icons";
// core components
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import NavPills from "pages/UI/MaterialUI/components/NavPills/NavPills";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";


// pages
import AccessControl from "../../AccessControl/AccessControl";
import {iFeatures, iGroups, iUsers} from "api/rest/C6";

export const CARBON_PHP = 'CarbonPHP/';

interface UserAccessControl extends iUsers {
    group_name?: string,
    feature_code?: string
}

interface iGroupFeatures extends iGroups, iFeatures {
    allowed_to_grant_group_id?: string;
}

class CarbonPHP extends React.Component<{ classes: any }, {
    users?: Array<UserAccessControl>,
    features?: Array<iFeatures>,
    groups?: Array<iGroupFeatures>,
    exampleCode: string,
    jsonStringOutput: string,
    exampleCodeAPI: string,
    exampleInterface: string,
    expandUsersRestTable: boolean,
    mobile: boolean,
}> {

    constructor(props) {
        super(props);
        this.state = {
            expandUsersRestTable: false,
            exampleCodeAPI: '',
            exampleInterface: '',
            exampleCode: '',
            jsonStringOutput: '',
            groups: [],
            features: [],
            users: [],
            mobile: false
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    resize() {
        let currentHideNav = (window.innerWidth <= 900);
        if (currentHideNav !== this.state.mobile) {
            this.setState({mobile: currentHideNav});
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    render() {
        console.log('CarbonPHP.tsx Render()');
        const {classes} = this.props;

        const orientation = {
            tabsGrid: {xs: 12, sm: 3, md: 2},
            contentGrid: {xs: 12, sm: 9, md: 10}
        };

        return (
            <Grid container style={{display:"inline"}}>
                <GridItem xs={12} sm={12} md={12}>
                    <div className={classes.textCenter}>
                        <h2><b>CarbonPHP</b></h2>
                        <h4>
                            "The next generation in your PHP development"
                        </h4>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <NavPills
                        color="info"
                        scrollButtons={this.state.mobile ? 'on' : 'off'}
                        horizontal={this.state.mobile ? undefined : orientation}
                        tabs={ [
                            {
                                tabIcon: Dashboard,
                                tabButton: "Introduction",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/README.md'}/>
                            },
                            {
                                tabIcon: Timeline,
                                tabButton: "Setup",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/overview.md'}/>
                            },
                            {
                                tabIcon: AllInclusive,
                                tabButton: "Autoloading",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/autoloading.md'}/>
                            },
                            {
                                tabIcon: Storage,
                                tabButton: "ORM",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/orm/orm.md'}/>
                            },
                            {
                                tabIcon: Storage,
                                tabButton: "Migrations",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/orm/orm.md'}/>
                            },
                            {
                                tabIcon: Announcement,
                                tabButton: "Throwables",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/RichardTMiles/CarbonPHPExamples/main/README.md'}/>
                            },
                            {
                                tabIcon: Restaurant,
                                tabButton: "Forks",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/forks.md'}/>
                            },
                            {
                                tabIcon: Power,
                                tabButton: "Websockets",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/websockets.md'}/>
                            },
                            {
                                tabIcon: ViewComfy,
                                tabButton: "Frontend",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/frontend.md'}/>
                            },
                            {
                                tabIcon: RecentActors,
                                tabButton: "IAM",
                                tabContent: <>
                                    <GridContainer justify="center">
                                        <GridItem xs={12} sm={12} md={12}>
                                            <FetchMarkdown
                                                url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/iam.md'}/>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <AccessControl/>
                                        </GridItem>
                                    </GridContainer>
                                </>
                            },
                            {
                                tabIcon: Exposure,
                                tabButton: "Minification",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/minification.md'}/>
                            },
                            {
                                tabIcon: RestorePage,
                                tabButton: "Caching",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/caching.md'}/>
                            },
                            {
                                tabIcon: AccountTree,
                                tabButton: "MVC",
                                tabContent: <FetchMarkdown
                                    url={'https://raw.githubusercontent.com/CarbonORM/CarbonPHP/lts/documentation/mvc.md'}/>
                            },
                        ]}
                    />
                </GridItem>
            </Grid>
        );
    }
}

export default withStyles(dashboardStyle)(CarbonPHP);
