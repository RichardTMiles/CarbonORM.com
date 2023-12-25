import {
    tWsLiveUpdate
} from "@carbonorm/carbonnode";

import { putStateCarbons, postStateCarbons, deleteStateCarbons } from "./Carbons";
import { putStateComments, postStateComments, deleteStateComments } from "./Comments";
import { putStateDocumentation, postStateDocumentation, deleteStateDocumentation } from "./Documentation";
import { putStateFeature_Group_References, postStateFeature_Group_References, deleteStateFeature_Group_References } from "./Feature_Group_References";
import { putStateFeatures, postStateFeatures, deleteStateFeatures } from "./Features";
import { putStateGroup_References, postStateGroup_References, deleteStateGroup_References } from "./Group_References";
import { putStateGroups, postStateGroups, deleteStateGroups } from "./Groups";
import { putStateHistory_Logs, postStateHistory_Logs, deleteStateHistory_Logs } from "./History_Logs";
import { putStateLocation_References, postStateLocation_References, deleteStateLocation_References } from "./Location_References";
import { putStateLocations, postStateLocations, deleteStateLocations } from "./Locations";
import { putStatePhotos, postStatePhotos, deleteStatePhotos } from "./Photos";
import { putStateReports, postStateReports, deleteStateReports } from "./Reports";
import { putStateUser_Followers, postStateUser_Followers, deleteStateUser_Followers } from "./User_Followers";
import { putStateUser_Groups, postStateUser_Groups, deleteStateUser_Groups } from "./User_Groups";
import { putStateUser_Messages, postStateUser_Messages, deleteStateUser_Messages } from "./User_Messages";
import { putStateUser_Sessions, postStateUser_Sessions, deleteStateUser_Sessions } from "./User_Sessions";
import { putStateUser_Tasks, postStateUser_Tasks, deleteStateUser_Tasks } from "./User_Tasks";
import { putStateUsers, postStateUsers, deleteStateUsers } from "./Users";
import { putStateWp_Commentmeta, postStateWp_Commentmeta, deleteStateWp_Commentmeta } from "./Wp_Commentmeta";
import { putStateWp_Comments, postStateWp_Comments, deleteStateWp_Comments } from "./Wp_Comments";
import { putStateWp_Links, postStateWp_Links, deleteStateWp_Links } from "./Wp_Links";
import { putStateWp_Options, postStateWp_Options, deleteStateWp_Options } from "./Wp_Options";
import { putStateWp_Postmeta, postStateWp_Postmeta, deleteStateWp_Postmeta } from "./Wp_Postmeta";
import { putStateWp_Posts, postStateWp_Posts, deleteStateWp_Posts } from "./Wp_Posts";
import { putStateWp_Term_Relationships, postStateWp_Term_Relationships, deleteStateWp_Term_Relationships } from "./Wp_Term_Relationships";
import { putStateWp_Term_Taxonomy, postStateWp_Term_Taxonomy, deleteStateWp_Term_Taxonomy } from "./Wp_Term_Taxonomy";
import { putStateWp_Termmeta, postStateWp_Termmeta, deleteStateWp_Termmeta } from "./Wp_Termmeta";
import { putStateWp_Terms, postStateWp_Terms, deleteStateWp_Terms } from "./Wp_Terms";
import { putStateWp_Usermeta, postStateWp_Usermeta, deleteStateWp_Usermeta } from "./Wp_Usermeta";
import { putStateWp_Users, postStateWp_Users, deleteStateWp_Users } from "./Wp_Users";

const wsLiveUpdates: tWsLiveUpdate = {
    carbons: {
        PUT: putStateCarbons,
        POST: postStateCarbons,
        DELETE: deleteStateCarbons,
    },
    comments: {
        PUT: putStateComments,
        POST: postStateComments,
        DELETE: deleteStateComments,
    },
    documentation: {
        PUT: putStateDocumentation,
        POST: postStateDocumentation,
        DELETE: deleteStateDocumentation,
    },
    feature_group_references: {
        PUT: putStateFeature_Group_References,
        POST: postStateFeature_Group_References,
        DELETE: deleteStateFeature_Group_References,
    },
    features: {
        PUT: putStateFeatures,
        POST: postStateFeatures,
        DELETE: deleteStateFeatures,
    },
    group_references: {
        PUT: putStateGroup_References,
        POST: postStateGroup_References,
        DELETE: deleteStateGroup_References,
    },
    groups: {
        PUT: putStateGroups,
        POST: postStateGroups,
        DELETE: deleteStateGroups,
    },
    history_logs: {
        PUT: putStateHistory_Logs,
        POST: postStateHistory_Logs,
        DELETE: deleteStateHistory_Logs,
    },
    location_references: {
        PUT: putStateLocation_References,
        POST: postStateLocation_References,
        DELETE: deleteStateLocation_References,
    },
    locations: {
        PUT: putStateLocations,
        POST: postStateLocations,
        DELETE: deleteStateLocations,
    },
    photos: {
        PUT: putStatePhotos,
        POST: postStatePhotos,
        DELETE: deleteStatePhotos,
    },
    reports: {
        PUT: putStateReports,
        POST: postStateReports,
        DELETE: deleteStateReports,
    },
    user_followers: {
        PUT: putStateUser_Followers,
        POST: postStateUser_Followers,
        DELETE: deleteStateUser_Followers,
    },
    user_groups: {
        PUT: putStateUser_Groups,
        POST: postStateUser_Groups,
        DELETE: deleteStateUser_Groups,
    },
    user_messages: {
        PUT: putStateUser_Messages,
        POST: postStateUser_Messages,
        DELETE: deleteStateUser_Messages,
    },
    user_sessions: {
        PUT: putStateUser_Sessions,
        POST: postStateUser_Sessions,
        DELETE: deleteStateUser_Sessions,
    },
    user_tasks: {
        PUT: putStateUser_Tasks,
        POST: postStateUser_Tasks,
        DELETE: deleteStateUser_Tasks,
    },
    users: {
        PUT: putStateUsers,
        POST: postStateUsers,
        DELETE: deleteStateUsers,
    },
    wp_commentmeta: {
        PUT: putStateWp_Commentmeta,
        POST: postStateWp_Commentmeta,
        DELETE: deleteStateWp_Commentmeta,
    },
    wp_comments: {
        PUT: putStateWp_Comments,
        POST: postStateWp_Comments,
        DELETE: deleteStateWp_Comments,
    },
    wp_links: {
        PUT: putStateWp_Links,
        POST: postStateWp_Links,
        DELETE: deleteStateWp_Links,
    },
    wp_options: {
        PUT: putStateWp_Options,
        POST: postStateWp_Options,
        DELETE: deleteStateWp_Options,
    },
    wp_postmeta: {
        PUT: putStateWp_Postmeta,
        POST: postStateWp_Postmeta,
        DELETE: deleteStateWp_Postmeta,
    },
    wp_posts: {
        PUT: putStateWp_Posts,
        POST: postStateWp_Posts,
        DELETE: deleteStateWp_Posts,
    },
    wp_term_relationships: {
        PUT: putStateWp_Term_Relationships,
        POST: postStateWp_Term_Relationships,
        DELETE: deleteStateWp_Term_Relationships,
    },
    wp_term_taxonomy: {
        PUT: putStateWp_Term_Taxonomy,
        POST: postStateWp_Term_Taxonomy,
        DELETE: deleteStateWp_Term_Taxonomy,
    },
    wp_termmeta: {
        PUT: putStateWp_Termmeta,
        POST: postStateWp_Termmeta,
        DELETE: deleteStateWp_Termmeta,
    },
    wp_terms: {
        PUT: putStateWp_Terms,
        POST: postStateWp_Terms,
        DELETE: deleteStateWp_Terms,
    },
    wp_usermeta: {
        PUT: putStateWp_Usermeta,
        POST: postStateWp_Usermeta,
        DELETE: deleteStateWp_Usermeta,
    },
    wp_users: {
        PUT: putStateWp_Users,
        POST: postStateWp_Users,
        DELETE: deleteStateWp_Users,
    },
};


export default wsLiveUpdates;


