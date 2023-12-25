import {
    C6Constants,
    iC6Object,
    iC6RestfulModel,
    tC6Tables,
} from "@carbonorm/carbonnode";

export const RestTablePrefix = 'carbon_';

export type RestTableNames = 'carbon_carbons'
 | 'carbon_comments'
 | 'carbon_documentation'
 | 'carbon_feature_group_references'
 | 'carbon_features'
 | 'carbon_group_references'
 | 'carbon_groups'
 | 'carbon_history_logs'
 | 'carbon_location_references'
 | 'carbon_locations'
 | 'carbon_photos'
 | 'carbon_reports'
 | 'carbon_user_followers'
 | 'carbon_user_groups'
 | 'carbon_user_messages'
 | 'carbon_user_sessions'
 | 'carbon_user_tasks'
 | 'carbon_users'
 | 'carbon_wp_commentmeta'
 | 'carbon_wp_comments'
 | 'carbon_wp_links'
 | 'carbon_wp_options'
 | 'carbon_wp_postmeta'
 | 'carbon_wp_posts'
 | 'carbon_wp_term_relationships'
 | 'carbon_wp_term_taxonomy'
 | 'carbon_wp_termmeta'
 | 'carbon_wp_terms'
 | 'carbon_wp_usermeta'
 | 'carbon_wp_users';

export type RestShortTableNames = 'carbons'
 | 'comments'
 | 'documentation'
 | 'feature_group_references'
 | 'features'
 | 'group_references'
 | 'groups'
 | 'history_logs'
 | 'location_references'
 | 'locations'
 | 'photos'
 | 'reports'
 | 'user_followers'
 | 'user_groups'
 | 'user_messages'
 | 'user_sessions'
 | 'user_tasks'
 | 'users'
 | 'wp_commentmeta'
 | 'wp_comments'
 | 'wp_links'
 | 'wp_options'
 | 'wp_postmeta'
 | 'wp_posts'
 | 'wp_term_relationships'
 | 'wp_term_taxonomy'
 | 'wp_termmeta'
 | 'wp_terms'
 | 'wp_usermeta'
 | 'wp_users';


export interface iCarbons {
    'entity_pk'?: string;
    'entity_fk'?: string | null;
    'entity_tag'?: string;
}

interface iDefineCarbons {
    'ENTITY_PK': string;
    'ENTITY_FK': string;
    'ENTITY_TAG': string;
}

export const carbons: iC6RestfulModel<RestTableNames> & iDefineCarbons = {
    TABLE_NAME: 'carbon_carbons',
    ENTITY_PK: 'carbon_carbons.entity_pk',
    ENTITY_FK: 'carbon_carbons.entity_fk',
    ENTITY_TAG: 'carbon_carbons.entity_tag',
    PRIMARY: [
        'carbon_carbons.entity_pk',
    ],
    PRIMARY_SHORT: [
        'entity_pk',
    ],
    COLUMNS: {
        'carbon_carbons.entity_pk': 'entity_pk',
        'carbon_carbons.entity_fk': 'entity_fk',
        'carbon_carbons.entity_tag': 'entity_tag',
    },
    TYPE_VALIDATION: {
        'carbon_carbons.entity_pk': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_carbons.entity_fk': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_carbons.entity_tag': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '100',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'entity_fk': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'entity_entity_entity_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        'entity_pk': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_fk',
            CONSTRAINT: 'entity_entity_entity_pk_fk',
        },{
            TABLE: 'carbon_comments',
            COLUMN: 'comment_id',
            CONSTRAINT: 'entity_comments_entity_entity_pk_fk',
        },{
            TABLE: 'carbon_comments',
            COLUMN: 'parent_id',
            CONSTRAINT: 'entity_comments_entity_parent_pk_fk',
        },{
            TABLE: 'carbon_comments',
            COLUMN: 'user_id',
            CONSTRAINT: 'entity_comments_entity_user_pk_fk',
        },{
            TABLE: 'carbon_feature_group_references',
            COLUMN: 'group_entity_id',
            CONSTRAINT: 'carbon_feature_group_references_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_feature_group_references',
            COLUMN: 'feature_entity_id',
            CONSTRAINT: 'carbon_feature_references_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_features',
            COLUMN: 'feature_entity_id',
            CONSTRAINT: 'carbon_features_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_group_references',
            COLUMN: 'group_id',
            CONSTRAINT: 'carbon_group_references_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_group_references',
            COLUMN: 'allowed_to_grant_group_id',
            CONSTRAINT: 'carbon_group_references_carbons_entity_pk_fk_2',
        },{
            TABLE: 'carbon_groups',
            COLUMN: 'entity_id',
            CONSTRAINT: 'carbon_feature_groups_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_groups',
            COLUMN: 'created_by',
            CONSTRAINT: 'carbon_feature_groups_carbons_entity_pk_fk_2',
        },{
            TABLE: 'carbon_location_references',
            COLUMN: 'entity_reference',
            CONSTRAINT: 'carbon_location_references_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_location_references',
            COLUMN: 'location_reference',
            CONSTRAINT: 'carbon_location_references_carbons_entity_pk_fk_2',
        },{
            TABLE: 'carbon_locations',
            COLUMN: 'entity_id',
            CONSTRAINT: 'entity_location_entity_entity_pk_fk',
        },{
            TABLE: 'carbon_photos',
            COLUMN: 'photo_id',
            CONSTRAINT: 'entity_photos_entity_entity_pk_fk',
        },{
            TABLE: 'carbon_photos',
            COLUMN: 'parent_id',
            CONSTRAINT: 'photos_entity_entity_pk_fk',
        },{
            TABLE: 'carbon_photos',
            COLUMN: 'user_id',
            CONSTRAINT: 'photos_entity_user_pk_fk',
        },{
            TABLE: 'carbon_user_followers',
            COLUMN: 'follower_table_id',
            CONSTRAINT: 'carbon_user_followers_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_user_followers',
            COLUMN: 'follows_user_id',
            CONSTRAINT: 'followers_entity_entity_follows_pk_fk',
        },{
            TABLE: 'carbon_user_followers',
            COLUMN: 'user_id',
            CONSTRAINT: 'followers_entity_followers_pk_fk',
        },{
            TABLE: 'carbon_user_groups',
            COLUMN: 'group_id',
            CONSTRAINT: 'carbon_user_groups_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_user_groups',
            COLUMN: 'user_id',
            CONSTRAINT: 'carbon_user_groups_carbons_entity_pk_fk_2',
        },{
            TABLE: 'carbon_user_messages',
            COLUMN: 'from_user_id',
            CONSTRAINT: 'carbon_user_messages_carbon_entity_pk_fk',
        },{
            TABLE: 'carbon_user_messages',
            COLUMN: 'message_id',
            CONSTRAINT: 'messages_entity_entity_pk_fk',
        },{
            TABLE: 'carbon_user_messages',
            COLUMN: 'to_user_id',
            CONSTRAINT: 'messages_entity_user_from_pk_fk',
        },{
            TABLE: 'carbon_user_tasks',
            COLUMN: 'task_id',
            CONSTRAINT: 'carbon_user_tasks_carbons_entity_pk_fk',
        },{
            TABLE: 'carbon_user_tasks',
            COLUMN: 'user_id',
            CONSTRAINT: 'carbon_user_tasks_carbons_entity_pk_fk_2',
        },{
            TABLE: 'carbon_user_tasks',
            COLUMN: 'from_id',
            CONSTRAINT: 'carbon_user_tasks_carbons_entity_pk_fk_3',
        },{
            TABLE: 'carbon_users',
            COLUMN: 'user_id',
            CONSTRAINT: 'user_entity_entity_pk_fk',
        },],
    }
}

export interface iComments {
    'parent_id'?: string;
    'comment_id'?: string;
    'user_id'?: string;
    'comment'?: string;
}

interface iDefineComments {
    'PARENT_ID': string;
    'COMMENT_ID': string;
    'USER_ID': string;
    'COMMENT': string;
}

export const comments: iC6RestfulModel<RestTableNames> & iDefineComments = {
    TABLE_NAME: 'carbon_comments',
    PARENT_ID: 'carbon_comments.parent_id',
    COMMENT_ID: 'carbon_comments.comment_id',
    USER_ID: 'carbon_comments.user_id',
    COMMENT: 'carbon_comments.comment',
    PRIMARY: [
        'carbon_comments.comment_id',
    ],
    PRIMARY_SHORT: [
        'comment_id',
    ],
    COLUMNS: {
        'carbon_comments.parent_id': 'parent_id',
        'carbon_comments.comment_id': 'comment_id',
        'carbon_comments.user_id': 'user_id',
        'carbon_comments.comment': 'comment',
    },
    TYPE_VALIDATION: {
        'carbon_comments.parent_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_comments.comment_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_comments.user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_comments.comment': {
            MYSQL_TYPE: 'blob',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'comment_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'entity_comments_entity_entity_pk_fk',
        },],'parent_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'entity_comments_entity_parent_pk_fk',
        },],'user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'entity_comments_entity_user_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iDocumentation {
    'documentation_uri'?: string;
    'documentation_data'?: string | null;
    'documentation_version'?: string;
    'documentation_active'?: number;
}

interface iDefineDocumentation {
    'DOCUMENTATION_URI': string;
    'DOCUMENTATION_DATA': string;
    'DOCUMENTATION_VERSION': string;
    'DOCUMENTATION_ACTIVE': string;
}

export const documentation: iC6RestfulModel<RestTableNames> & iDefineDocumentation = {
    TABLE_NAME: 'carbon_documentation',
    DOCUMENTATION_URI: 'carbon_documentation.documentation_uri',
    DOCUMENTATION_DATA: 'carbon_documentation.documentation_data',
    DOCUMENTATION_VERSION: 'carbon_documentation.documentation_version',
    DOCUMENTATION_ACTIVE: 'carbon_documentation.documentation_active',
    PRIMARY: [
    ],
    PRIMARY_SHORT: [
    ],
    COLUMNS: {
        'carbon_documentation.documentation_uri': 'documentation_uri',
        'carbon_documentation.documentation_data': 'documentation_data',
        'carbon_documentation.documentation_version': 'documentation_version',
        'carbon_documentation.documentation_active': 'documentation_active',
    },
    TYPE_VALIDATION: {
        'carbon_documentation.documentation_uri': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_documentation.documentation_data': {
            MYSQL_TYPE: 'longblob',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_documentation.documentation_version': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '40',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_documentation.documentation_active': {
            MYSQL_TYPE: 'tinyint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iFeature_Group_References {
    'feature_entity_id'?: string | null;
    'group_entity_id'?: string | null;
}

interface iDefineFeature_Group_References {
    'FEATURE_ENTITY_ID': string;
    'GROUP_ENTITY_ID': string;
}

export const feature_group_references: iC6RestfulModel<RestTableNames> & iDefineFeature_Group_References = {
    TABLE_NAME: 'carbon_feature_group_references',
    FEATURE_ENTITY_ID: 'carbon_feature_group_references.feature_entity_id',
    GROUP_ENTITY_ID: 'carbon_feature_group_references.group_entity_id',
    PRIMARY: [
    ],
    PRIMARY_SHORT: [
    ],
    COLUMNS: {
        'carbon_feature_group_references.feature_entity_id': 'feature_entity_id',
        'carbon_feature_group_references.group_entity_id': 'group_entity_id',
    },
    TYPE_VALIDATION: {
        'carbon_feature_group_references.feature_entity_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_feature_group_references.group_entity_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'group_entity_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_feature_group_references_carbons_entity_pk_fk',
        },],'feature_entity_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_feature_references_carbons_entity_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iFeatures {
    'feature_entity_id'?: string;
    'feature_code'?: string;
    'feature_creation_date'?: string | null;
}

interface iDefineFeatures {
    'FEATURE_ENTITY_ID': string;
    'FEATURE_CODE': string;
    'FEATURE_CREATION_DATE': string;
}

export const features: iC6RestfulModel<RestTableNames> & iDefineFeatures = {
    TABLE_NAME: 'carbon_features',
    FEATURE_ENTITY_ID: 'carbon_features.feature_entity_id',
    FEATURE_CODE: 'carbon_features.feature_code',
    FEATURE_CREATION_DATE: 'carbon_features.feature_creation_date',
    PRIMARY: [
        'carbon_features.feature_entity_id',
    ],
    PRIMARY_SHORT: [
        'feature_entity_id',
    ],
    COLUMNS: {
        'carbon_features.feature_entity_id': 'feature_entity_id',
        'carbon_features.feature_code': 'feature_code',
        'carbon_features.feature_creation_date': 'feature_creation_date',
    },
    TYPE_VALIDATION: {
        'carbon_features.feature_entity_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_features.feature_code': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '30',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_features.feature_creation_date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'feature_entity_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_features_carbons_entity_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iGroup_References {
    'group_id'?: string | null;
    'allowed_to_grant_group_id'?: string | null;
}

interface iDefineGroup_References {
    'GROUP_ID': string;
    'ALLOWED_TO_GRANT_GROUP_ID': string;
}

export const group_references: iC6RestfulModel<RestTableNames> & iDefineGroup_References = {
    TABLE_NAME: 'carbon_group_references',
    GROUP_ID: 'carbon_group_references.group_id',
    ALLOWED_TO_GRANT_GROUP_ID: 'carbon_group_references.allowed_to_grant_group_id',
    PRIMARY: [
    ],
    PRIMARY_SHORT: [
    ],
    COLUMNS: {
        'carbon_group_references.group_id': 'group_id',
        'carbon_group_references.allowed_to_grant_group_id': 'allowed_to_grant_group_id',
    },
    TYPE_VALIDATION: {
        'carbon_group_references.group_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_group_references.allowed_to_grant_group_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'group_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_group_references_carbons_entity_pk_fk',
        },],'allowed_to_grant_group_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_group_references_carbons_entity_pk_fk_2',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iGroups {
    'group_name'?: string;
    'entity_id'?: string;
    'created_by'?: string;
    'creation_date'?: string | null;
}

interface iDefineGroups {
    'GROUP_NAME': string;
    'ENTITY_ID': string;
    'CREATED_BY': string;
    'CREATION_DATE': string;
}

export const groups: iC6RestfulModel<RestTableNames> & iDefineGroups = {
    TABLE_NAME: 'carbon_groups',
    GROUP_NAME: 'carbon_groups.group_name',
    ENTITY_ID: 'carbon_groups.entity_id',
    CREATED_BY: 'carbon_groups.created_by',
    CREATION_DATE: 'carbon_groups.creation_date',
    PRIMARY: [
        'carbon_groups.entity_id',
    ],
    PRIMARY_SHORT: [
        'entity_id',
    ],
    COLUMNS: {
        'carbon_groups.group_name': 'group_name',
        'carbon_groups.entity_id': 'entity_id',
        'carbon_groups.created_by': 'created_by',
        'carbon_groups.creation_date': 'creation_date',
    },
    TYPE_VALIDATION: {
        'carbon_groups.group_name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_groups.entity_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_groups.created_by': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_groups.creation_date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'entity_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_feature_groups_carbons_entity_pk_fk',
        },],'created_by': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_feature_groups_carbons_entity_pk_fk_2',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iHistory_Logs {
    'history_uuid'?: string;
    'history_table'?: string | null;
    'history_type'?: string | null;
    'history_data'?: string | null;
    'history_original_query'?: string | null;
    'history_time'?: string | null;
}

interface iDefineHistory_Logs {
    'HISTORY_UUID': string;
    'HISTORY_TABLE': string;
    'HISTORY_TYPE': string;
    'HISTORY_DATA': string;
    'HISTORY_ORIGINAL_QUERY': string;
    'HISTORY_TIME': string;
}

export const history_logs: iC6RestfulModel<RestTableNames> & iDefineHistory_Logs = {
    TABLE_NAME: 'carbon_history_logs',
    HISTORY_UUID: 'carbon_history_logs.history_uuid',
    HISTORY_TABLE: 'carbon_history_logs.history_table',
    HISTORY_TYPE: 'carbon_history_logs.history_type',
    HISTORY_DATA: 'carbon_history_logs.history_data',
    HISTORY_ORIGINAL_QUERY: 'carbon_history_logs.history_original_query',
    HISTORY_TIME: 'carbon_history_logs.history_time',
    PRIMARY: [
    ],
    PRIMARY_SHORT: [
    ],
    COLUMNS: {
        'carbon_history_logs.history_uuid': 'history_uuid',
        'carbon_history_logs.history_table': 'history_table',
        'carbon_history_logs.history_type': 'history_type',
        'carbon_history_logs.history_data': 'history_data',
        'carbon_history_logs.history_original_query': 'history_original_query',
        'carbon_history_logs.history_time': 'history_time',
    },
    TYPE_VALIDATION: {
        'carbon_history_logs.history_uuid': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_history_logs.history_table': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_history_logs.history_type': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_history_logs.history_data': {
            MYSQL_TYPE: 'json',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_history_logs.history_original_query': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '1024',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_history_logs.history_time': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iLocation_References {
    'entity_reference'?: string;
    'location_reference'?: string;
    'location_time'?: string;
}

interface iDefineLocation_References {
    'ENTITY_REFERENCE': string;
    'LOCATION_REFERENCE': string;
    'LOCATION_TIME': string;
}

export const location_references: iC6RestfulModel<RestTableNames> & iDefineLocation_References = {
    TABLE_NAME: 'carbon_location_references',
    ENTITY_REFERENCE: 'carbon_location_references.entity_reference',
    LOCATION_REFERENCE: 'carbon_location_references.location_reference',
    LOCATION_TIME: 'carbon_location_references.location_time',
    PRIMARY: [
    ],
    PRIMARY_SHORT: [
    ],
    COLUMNS: {
        'carbon_location_references.entity_reference': 'entity_reference',
        'carbon_location_references.location_reference': 'location_reference',
        'carbon_location_references.location_time': 'location_time',
    },
    TYPE_VALIDATION: {
        'carbon_location_references.entity_reference': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_location_references.location_reference': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_location_references.location_time': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'entity_reference': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_location_references_carbons_entity_pk_fk',
        },],'location_reference': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_location_references_carbons_entity_pk_fk_2',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iLocations {
    'entity_id'?: string;
    'latitude'?: string | null;
    'longitude'?: string | null;
    'street'?: string | null;
    'city'?: string | null;
    'state'?: string | null;
    'elevation'?: string | null;
    'zip'?: number | null;
}

interface iDefineLocations {
    'ENTITY_ID': string;
    'LATITUDE': string;
    'LONGITUDE': string;
    'STREET': string;
    'CITY': string;
    'STATE': string;
    'ELEVATION': string;
    'ZIP': string;
}

export const locations: iC6RestfulModel<RestTableNames> & iDefineLocations = {
    TABLE_NAME: 'carbon_locations',
    ENTITY_ID: 'carbon_locations.entity_id',
    LATITUDE: 'carbon_locations.latitude',
    LONGITUDE: 'carbon_locations.longitude',
    STREET: 'carbon_locations.street',
    CITY: 'carbon_locations.city',
    STATE: 'carbon_locations.state',
    ELEVATION: 'carbon_locations.elevation',
    ZIP: 'carbon_locations.zip',
    PRIMARY: [
        'carbon_locations.entity_id',
    ],
    PRIMARY_SHORT: [
        'entity_id',
    ],
    COLUMNS: {
        'carbon_locations.entity_id': 'entity_id',
        'carbon_locations.latitude': 'latitude',
        'carbon_locations.longitude': 'longitude',
        'carbon_locations.street': 'street',
        'carbon_locations.city': 'city',
        'carbon_locations.state': 'state',
        'carbon_locations.elevation': 'elevation',
        'carbon_locations.zip': 'zip',
    },
    TYPE_VALIDATION: {
        'carbon_locations.entity_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_locations.latitude': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_locations.longitude': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_locations.street': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_locations.city': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '40',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_locations.state': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '10',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_locations.elevation': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '40',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_locations.zip': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'entity_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'entity_location_entity_entity_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iPhotos {
    'parent_id'?: string;
    'photo_id'?: string;
    'user_id'?: string;
    'photo_path'?: string;
    'photo_description'?: string | null;
}

interface iDefinePhotos {
    'PARENT_ID': string;
    'PHOTO_ID': string;
    'USER_ID': string;
    'PHOTO_PATH': string;
    'PHOTO_DESCRIPTION': string;
}

export const photos: iC6RestfulModel<RestTableNames> & iDefinePhotos = {
    TABLE_NAME: 'carbon_photos',
    PARENT_ID: 'carbon_photos.parent_id',
    PHOTO_ID: 'carbon_photos.photo_id',
    USER_ID: 'carbon_photos.user_id',
    PHOTO_PATH: 'carbon_photos.photo_path',
    PHOTO_DESCRIPTION: 'carbon_photos.photo_description',
    PRIMARY: [
        'carbon_photos.parent_id',
    ],
    PRIMARY_SHORT: [
        'parent_id',
    ],
    COLUMNS: {
        'carbon_photos.parent_id': 'parent_id',
        'carbon_photos.photo_id': 'photo_id',
        'carbon_photos.user_id': 'user_id',
        'carbon_photos.photo_path': 'photo_path',
        'carbon_photos.photo_description': 'photo_description',
    },
    TYPE_VALIDATION: {
        'carbon_photos.parent_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_photos.photo_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_photos.user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_photos.photo_path': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_photos.photo_description': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'photo_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'entity_photos_entity_entity_pk_fk',
        },],'parent_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'photos_entity_entity_pk_fk',
        },],'user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'photos_entity_user_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iReports {
    'log_level'?: string | null;
    'report'?: string | null;
    'date'?: string;
    'call_trace'?: string;
}

interface iDefineReports {
    'LOG_LEVEL': string;
    'REPORT': string;
    'DATE': string;
    'CALL_TRACE': string;
}

export const reports: iC6RestfulModel<RestTableNames> & iDefineReports = {
    TABLE_NAME: 'carbon_reports',
    LOG_LEVEL: 'carbon_reports.log_level',
    REPORT: 'carbon_reports.report',
    DATE: 'carbon_reports.date',
    CALL_TRACE: 'carbon_reports.call_trace',
    PRIMARY: [
    ],
    PRIMARY_SHORT: [
    ],
    COLUMNS: {
        'carbon_reports.log_level': 'log_level',
        'carbon_reports.report': 'report',
        'carbon_reports.date': 'date',
        'carbon_reports.call_trace': 'call_trace',
    },
    TYPE_VALIDATION: {
        'carbon_reports.log_level': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_reports.report': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_reports.date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_reports.call_trace': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iUser_Followers {
    'follower_table_id'?: string;
    'follows_user_id'?: string;
    'user_id'?: string;
}

interface iDefineUser_Followers {
    'FOLLOWER_TABLE_ID': string;
    'FOLLOWS_USER_ID': string;
    'USER_ID': string;
}

export const user_followers: iC6RestfulModel<RestTableNames> & iDefineUser_Followers = {
    TABLE_NAME: 'carbon_user_followers',
    FOLLOWER_TABLE_ID: 'carbon_user_followers.follower_table_id',
    FOLLOWS_USER_ID: 'carbon_user_followers.follows_user_id',
    USER_ID: 'carbon_user_followers.user_id',
    PRIMARY: [
        'carbon_user_followers.follower_table_id',
    ],
    PRIMARY_SHORT: [
        'follower_table_id',
    ],
    COLUMNS: {
        'carbon_user_followers.follower_table_id': 'follower_table_id',
        'carbon_user_followers.follows_user_id': 'follows_user_id',
        'carbon_user_followers.user_id': 'user_id',
    },
    TYPE_VALIDATION: {
        'carbon_user_followers.follower_table_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_followers.follows_user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_followers.user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'follower_table_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_user_followers_carbons_entity_pk_fk',
        },],'follows_user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'followers_entity_entity_follows_pk_fk',
        },],'user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'followers_entity_followers_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iUser_Groups {
    'group_id'?: string | null;
    'user_id'?: string | null;
}

interface iDefineUser_Groups {
    'GROUP_ID': string;
    'USER_ID': string;
}

export const user_groups: iC6RestfulModel<RestTableNames> & iDefineUser_Groups = {
    TABLE_NAME: 'carbon_user_groups',
    GROUP_ID: 'carbon_user_groups.group_id',
    USER_ID: 'carbon_user_groups.user_id',
    PRIMARY: [
    ],
    PRIMARY_SHORT: [
    ],
    COLUMNS: {
        'carbon_user_groups.group_id': 'group_id',
        'carbon_user_groups.user_id': 'user_id',
    },
    TYPE_VALIDATION: {
        'carbon_user_groups.group_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_groups.user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'group_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_user_groups_carbons_entity_pk_fk',
        },],'user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_user_groups_carbons_entity_pk_fk_2',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iUser_Messages {
    'message_id'?: string;
    'from_user_id'?: string;
    'to_user_id'?: string;
    'message'?: string;
    'message_read'?: number | null;
    'creation_date'?: string | null;
}

interface iDefineUser_Messages {
    'MESSAGE_ID': string;
    'FROM_USER_ID': string;
    'TO_USER_ID': string;
    'MESSAGE': string;
    'MESSAGE_READ': string;
    'CREATION_DATE': string;
}

export const user_messages: iC6RestfulModel<RestTableNames> & iDefineUser_Messages = {
    TABLE_NAME: 'carbon_user_messages',
    MESSAGE_ID: 'carbon_user_messages.message_id',
    FROM_USER_ID: 'carbon_user_messages.from_user_id',
    TO_USER_ID: 'carbon_user_messages.to_user_id',
    MESSAGE: 'carbon_user_messages.message',
    MESSAGE_READ: 'carbon_user_messages.message_read',
    CREATION_DATE: 'carbon_user_messages.creation_date',
    PRIMARY: [
        'carbon_user_messages.message_id',
    ],
    PRIMARY_SHORT: [
        'message_id',
    ],
    COLUMNS: {
        'carbon_user_messages.message_id': 'message_id',
        'carbon_user_messages.from_user_id': 'from_user_id',
        'carbon_user_messages.to_user_id': 'to_user_id',
        'carbon_user_messages.message': 'message',
        'carbon_user_messages.message_read': 'message_read',
        'carbon_user_messages.creation_date': 'creation_date',
    },
    TYPE_VALIDATION: {
        'carbon_user_messages.message_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_messages.from_user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_messages.to_user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_messages.message': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_messages.message_read': {
            MYSQL_TYPE: 'tinyint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_messages.creation_date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'from_user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_user_messages_carbon_entity_pk_fk',
        },],'message_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'messages_entity_entity_pk_fk',
        },],'to_user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'messages_entity_user_from_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iUser_Sessions {
    'user_id'?: string;
    'user_ip'?: string | null;
    'session_id'?: string;
    'session_expires'?: string;
    'session_data'?: string | null;
    'user_online_status'?: number | null;
}

interface iDefineUser_Sessions {
    'USER_ID': string;
    'USER_IP': string;
    'SESSION_ID': string;
    'SESSION_EXPIRES': string;
    'SESSION_DATA': string;
    'USER_ONLINE_STATUS': string;
}

export const user_sessions: iC6RestfulModel<RestTableNames> & iDefineUser_Sessions = {
    TABLE_NAME: 'carbon_user_sessions',
    USER_ID: 'carbon_user_sessions.user_id',
    USER_IP: 'carbon_user_sessions.user_ip',
    SESSION_ID: 'carbon_user_sessions.session_id',
    SESSION_EXPIRES: 'carbon_user_sessions.session_expires',
    SESSION_DATA: 'carbon_user_sessions.session_data',
    USER_ONLINE_STATUS: 'carbon_user_sessions.user_online_status',
    PRIMARY: [
        'carbon_user_sessions.session_id',
    ],
    PRIMARY_SHORT: [
        'session_id',
    ],
    COLUMNS: {
        'carbon_user_sessions.user_id': 'user_id',
        'carbon_user_sessions.user_ip': 'user_ip',
        'carbon_user_sessions.session_id': 'session_id',
        'carbon_user_sessions.session_expires': 'session_expires',
        'carbon_user_sessions.session_data': 'session_data',
        'carbon_user_sessions.user_online_status': 'user_online_status',
    },
    TYPE_VALIDATION: {
        'carbon_user_sessions.user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_sessions.user_ip': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '80',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_sessions.session_id': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_sessions.session_expires': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_sessions.session_data': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_user_sessions.user_online_status': {
            MYSQL_TYPE: 'tinyint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iUser_Tasks {
    'task_id'?: string;
    'user_id'?: string;
    'from_id'?: string | null;
    'task_name'?: string;
    'task_description'?: string | null;
    'percent_complete'?: number | null;
    'start_date'?: string | null;
    'end_date'?: string | null;
}

interface iDefineUser_Tasks {
    'TASK_ID': string;
    'USER_ID': string;
    'FROM_ID': string;
    'TASK_NAME': string;
    'TASK_DESCRIPTION': string;
    'PERCENT_COMPLETE': string;
    'START_DATE': string;
    'END_DATE': string;
}

export const user_tasks: iC6RestfulModel<RestTableNames> & iDefineUser_Tasks = {
    TABLE_NAME: 'carbon_user_tasks',
    TASK_ID: 'carbon_user_tasks.task_id',
    USER_ID: 'carbon_user_tasks.user_id',
    FROM_ID: 'carbon_user_tasks.from_id',
    TASK_NAME: 'carbon_user_tasks.task_name',
    TASK_DESCRIPTION: 'carbon_user_tasks.task_description',
    PERCENT_COMPLETE: 'carbon_user_tasks.percent_complete',
    START_DATE: 'carbon_user_tasks.start_date',
    END_DATE: 'carbon_user_tasks.end_date',
    PRIMARY: [
        'carbon_user_tasks.task_id',
    ],
    PRIMARY_SHORT: [
        'task_id',
    ],
    COLUMNS: {
        'carbon_user_tasks.task_id': 'task_id',
        'carbon_user_tasks.user_id': 'user_id',
        'carbon_user_tasks.from_id': 'from_id',
        'carbon_user_tasks.task_name': 'task_name',
        'carbon_user_tasks.task_description': 'task_description',
        'carbon_user_tasks.percent_complete': 'percent_complete',
        'carbon_user_tasks.start_date': 'start_date',
        'carbon_user_tasks.end_date': 'end_date',
    },
    TYPE_VALIDATION: {
        'carbon_user_tasks.task_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_tasks.user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_tasks.from_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_tasks.task_name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '40',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_tasks.task_description': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_tasks.percent_complete': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_tasks.start_date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_user_tasks.end_date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'task_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_user_tasks_carbons_entity_pk_fk',
        },],'user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_user_tasks_carbons_entity_pk_fk_2',
        },],'from_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'carbon_user_tasks_carbons_entity_pk_fk_3',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iUsers {
    'user_username'?: string;
    'user_password'?: string;
    'user_id'?: string;
    'user_type'?: string;
    'user_sport'?: string | null;
    'user_session_id'?: string | null;
    'user_facebook_id'?: string | null;
    'user_first_name'?: string;
    'user_last_name'?: string;
    'user_profile_pic'?: string | null;
    'user_profile_uri'?: string | null;
    'user_cover_photo'?: string | null;
    'user_birthday'?: string | null;
    'user_gender'?: string | null;
    'user_about_me'?: string | null;
    'user_rank'?: number | null;
    'user_email'?: string;
    'user_email_code'?: string | null;
    'user_email_confirmed'?: number | null;
    'user_generated_string'?: string | null;
    'user_membership'?: number | null;
    'user_deactivated'?: number | null;
    'user_last_login'?: string;
    'user_ip'?: string;
    'user_education_history'?: string | null;
    'user_location'?: string | null;
    'user_creation_date'?: string | null;
}

interface iDefineUsers {
    'USER_USERNAME': string;
    'USER_PASSWORD': string;
    'USER_ID': string;
    'USER_TYPE': string;
    'USER_SPORT': string;
    'USER_SESSION_ID': string;
    'USER_FACEBOOK_ID': string;
    'USER_FIRST_NAME': string;
    'USER_LAST_NAME': string;
    'USER_PROFILE_PIC': string;
    'USER_PROFILE_URI': string;
    'USER_COVER_PHOTO': string;
    'USER_BIRTHDAY': string;
    'USER_GENDER': string;
    'USER_ABOUT_ME': string;
    'USER_RANK': string;
    'USER_EMAIL': string;
    'USER_EMAIL_CODE': string;
    'USER_EMAIL_CONFIRMED': string;
    'USER_GENERATED_STRING': string;
    'USER_MEMBERSHIP': string;
    'USER_DEACTIVATED': string;
    'USER_LAST_LOGIN': string;
    'USER_IP': string;
    'USER_EDUCATION_HISTORY': string;
    'USER_LOCATION': string;
    'USER_CREATION_DATE': string;
}

export const users: iC6RestfulModel<RestTableNames> & iDefineUsers = {
    TABLE_NAME: 'carbon_users',
    USER_USERNAME: 'carbon_users.user_username',
    USER_PASSWORD: 'carbon_users.user_password',
    USER_ID: 'carbon_users.user_id',
    USER_TYPE: 'carbon_users.user_type',
    USER_SPORT: 'carbon_users.user_sport',
    USER_SESSION_ID: 'carbon_users.user_session_id',
    USER_FACEBOOK_ID: 'carbon_users.user_facebook_id',
    USER_FIRST_NAME: 'carbon_users.user_first_name',
    USER_LAST_NAME: 'carbon_users.user_last_name',
    USER_PROFILE_PIC: 'carbon_users.user_profile_pic',
    USER_PROFILE_URI: 'carbon_users.user_profile_uri',
    USER_COVER_PHOTO: 'carbon_users.user_cover_photo',
    USER_BIRTHDAY: 'carbon_users.user_birthday',
    USER_GENDER: 'carbon_users.user_gender',
    USER_ABOUT_ME: 'carbon_users.user_about_me',
    USER_RANK: 'carbon_users.user_rank',
    USER_EMAIL: 'carbon_users.user_email',
    USER_EMAIL_CODE: 'carbon_users.user_email_code',
    USER_EMAIL_CONFIRMED: 'carbon_users.user_email_confirmed',
    USER_GENERATED_STRING: 'carbon_users.user_generated_string',
    USER_MEMBERSHIP: 'carbon_users.user_membership',
    USER_DEACTIVATED: 'carbon_users.user_deactivated',
    USER_LAST_LOGIN: 'carbon_users.user_last_login',
    USER_IP: 'carbon_users.user_ip',
    USER_EDUCATION_HISTORY: 'carbon_users.user_education_history',
    USER_LOCATION: 'carbon_users.user_location',
    USER_CREATION_DATE: 'carbon_users.user_creation_date',
    PRIMARY: [
        'carbon_users.user_id',
    ],
    PRIMARY_SHORT: [
        'user_id',
    ],
    COLUMNS: {
        'carbon_users.user_username': 'user_username',
        'carbon_users.user_password': 'user_password',
        'carbon_users.user_id': 'user_id',
        'carbon_users.user_type': 'user_type',
        'carbon_users.user_sport': 'user_sport',
        'carbon_users.user_session_id': 'user_session_id',
        'carbon_users.user_facebook_id': 'user_facebook_id',
        'carbon_users.user_first_name': 'user_first_name',
        'carbon_users.user_last_name': 'user_last_name',
        'carbon_users.user_profile_pic': 'user_profile_pic',
        'carbon_users.user_profile_uri': 'user_profile_uri',
        'carbon_users.user_cover_photo': 'user_cover_photo',
        'carbon_users.user_birthday': 'user_birthday',
        'carbon_users.user_gender': 'user_gender',
        'carbon_users.user_about_me': 'user_about_me',
        'carbon_users.user_rank': 'user_rank',
        'carbon_users.user_email': 'user_email',
        'carbon_users.user_email_code': 'user_email_code',
        'carbon_users.user_email_confirmed': 'user_email_confirmed',
        'carbon_users.user_generated_string': 'user_generated_string',
        'carbon_users.user_membership': 'user_membership',
        'carbon_users.user_deactivated': 'user_deactivated',
        'carbon_users.user_last_login': 'user_last_login',
        'carbon_users.user_ip': 'user_ip',
        'carbon_users.user_education_history': 'user_education_history',
        'carbon_users.user_location': 'user_location',
        'carbon_users.user_creation_date': 'user_creation_date',
    },
    TYPE_VALIDATION: {
        'carbon_users.user_username': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '100',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_password': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_id': {
            MYSQL_TYPE: 'binary',
            MAX_LENGTH: '16',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_type': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_sport': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_session_id': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_facebook_id': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_first_name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '25',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_last_name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '25',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_profile_pic': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_profile_uri': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_cover_photo': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_birthday': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '9',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_gender': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '25',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_about_me': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_rank': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_email': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '50',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_email_code': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '225',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_email_confirmed': {
            MYSQL_TYPE: 'tinyint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_generated_string': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '200',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_membership': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_deactivated': {
            MYSQL_TYPE: 'tinyint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_last_login': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_ip': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_education_history': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '200',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_location': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_users.user_creation_date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        'user_id': [{
            TABLE: 'carbon_carbons',
            COLUMN: 'entity_pk',
            CONSTRAINT: 'user_entity_entity_pk_fk',
        },],
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Commentmeta {
    'meta_id'?: number | null;
    'comment_id'?: number | null;
    'meta_key'?: string | null;
    'meta_value'?: string | null;
}

interface iDefineWp_Commentmeta {
    'META_ID': string;
    'COMMENT_ID': string;
    'META_KEY': string;
    'META_VALUE': string;
}

export const wp_commentmeta: iC6RestfulModel<RestTableNames> & iDefineWp_Commentmeta = {
    TABLE_NAME: 'carbon_wp_commentmeta',
    META_ID: 'carbon_wp_commentmeta.meta_id',
    COMMENT_ID: 'carbon_wp_commentmeta.comment_id',
    META_KEY: 'carbon_wp_commentmeta.meta_key',
    META_VALUE: 'carbon_wp_commentmeta.meta_value',
    PRIMARY: [
        'carbon_wp_commentmeta.meta_id',
    ],
    PRIMARY_SHORT: [
        'meta_id',
    ],
    COLUMNS: {
        'carbon_wp_commentmeta.meta_id': 'meta_id',
        'carbon_wp_commentmeta.comment_id': 'comment_id',
        'carbon_wp_commentmeta.meta_key': 'meta_key',
        'carbon_wp_commentmeta.meta_value': 'meta_value',
    },
    TYPE_VALIDATION: {
        'carbon_wp_commentmeta.meta_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_commentmeta.comment_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_commentmeta.meta_key': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_commentmeta.meta_value': {
            MYSQL_TYPE: 'longtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Comments {
    'comment_ID'?: number | null;
    'comment_post_ID'?: number | null;
    'comment_author'?: string | null;
    'comment_author_email'?: string | null;
    'comment_author_url'?: string | null;
    'comment_author_IP'?: string | null;
    'comment_date'?: string;
    'comment_date_gmt'?: string;
    'comment_content'?: string | null;
    'comment_karma'?: number;
    'comment_approved'?: string | null;
    'comment_agent'?: string | null;
    'comment_type'?: string | null;
    'comment_parent'?: number | null;
    'user_id'?: number | null;
}

interface iDefineWp_Comments {
    'COMMENT_ID': string;
    'COMMENT_POST_ID': string;
    'COMMENT_AUTHOR': string;
    'COMMENT_AUTHOR_EMAIL': string;
    'COMMENT_AUTHOR_URL': string;
    'COMMENT_AUTHOR_IP': string;
    'COMMENT_DATE': string;
    'COMMENT_DATE_GMT': string;
    'COMMENT_CONTENT': string;
    'COMMENT_KARMA': string;
    'COMMENT_APPROVED': string;
    'COMMENT_AGENT': string;
    'COMMENT_TYPE': string;
    'COMMENT_PARENT': string;
    'USER_ID': string;
}

export const wp_comments: iC6RestfulModel<RestTableNames> & iDefineWp_Comments = {
    TABLE_NAME: 'carbon_wp_comments',
    COMMENT_ID: 'carbon_wp_comments.comment_ID',
    COMMENT_POST_ID: 'carbon_wp_comments.comment_post_ID',
    COMMENT_AUTHOR: 'carbon_wp_comments.comment_author',
    COMMENT_AUTHOR_EMAIL: 'carbon_wp_comments.comment_author_email',
    COMMENT_AUTHOR_URL: 'carbon_wp_comments.comment_author_url',
    COMMENT_AUTHOR_IP: 'carbon_wp_comments.comment_author_IP',
    COMMENT_DATE: 'carbon_wp_comments.comment_date',
    COMMENT_DATE_GMT: 'carbon_wp_comments.comment_date_gmt',
    COMMENT_CONTENT: 'carbon_wp_comments.comment_content',
    COMMENT_KARMA: 'carbon_wp_comments.comment_karma',
    COMMENT_APPROVED: 'carbon_wp_comments.comment_approved',
    COMMENT_AGENT: 'carbon_wp_comments.comment_agent',
    COMMENT_TYPE: 'carbon_wp_comments.comment_type',
    COMMENT_PARENT: 'carbon_wp_comments.comment_parent',
    USER_ID: 'carbon_wp_comments.user_id',
    PRIMARY: [
        'carbon_wp_comments.comment_ID',
    ],
    PRIMARY_SHORT: [
        'comment_ID',
    ],
    COLUMNS: {
        'carbon_wp_comments.comment_ID': 'comment_ID',
        'carbon_wp_comments.comment_post_ID': 'comment_post_ID',
        'carbon_wp_comments.comment_author': 'comment_author',
        'carbon_wp_comments.comment_author_email': 'comment_author_email',
        'carbon_wp_comments.comment_author_url': 'comment_author_url',
        'carbon_wp_comments.comment_author_IP': 'comment_author_IP',
        'carbon_wp_comments.comment_date': 'comment_date',
        'carbon_wp_comments.comment_date_gmt': 'comment_date_gmt',
        'carbon_wp_comments.comment_content': 'comment_content',
        'carbon_wp_comments.comment_karma': 'comment_karma',
        'carbon_wp_comments.comment_approved': 'comment_approved',
        'carbon_wp_comments.comment_agent': 'comment_agent',
        'carbon_wp_comments.comment_type': 'comment_type',
        'carbon_wp_comments.comment_parent': 'comment_parent',
        'carbon_wp_comments.user_id': 'user_id',
    },
    TYPE_VALIDATION: {
        'carbon_wp_comments.comment_ID': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_post_ID': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_author': {
            MYSQL_TYPE: 'tinytext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_author_email': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '100',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_author_url': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '200',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_author_IP': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '100',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_comments.comment_date_gmt': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_comments.comment_content': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_karma': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_comments.comment_approved': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_agent': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_type': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.comment_parent': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_comments.user_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Links {
    'link_id'?: number | null;
    'link_url'?: string | null;
    'link_name'?: string | null;
    'link_image'?: string | null;
    'link_target'?: string | null;
    'link_description'?: string | null;
    'link_visible'?: string | null;
    'link_owner'?: number | null;
    'link_rating'?: number;
    'link_updated'?: string;
    'link_rel'?: string | null;
    'link_notes'?: string | null;
    'link_rss'?: string | null;
}

interface iDefineWp_Links {
    'LINK_ID': string;
    'LINK_URL': string;
    'LINK_NAME': string;
    'LINK_IMAGE': string;
    'LINK_TARGET': string;
    'LINK_DESCRIPTION': string;
    'LINK_VISIBLE': string;
    'LINK_OWNER': string;
    'LINK_RATING': string;
    'LINK_UPDATED': string;
    'LINK_REL': string;
    'LINK_NOTES': string;
    'LINK_RSS': string;
}

export const wp_links: iC6RestfulModel<RestTableNames> & iDefineWp_Links = {
    TABLE_NAME: 'carbon_wp_links',
    LINK_ID: 'carbon_wp_links.link_id',
    LINK_URL: 'carbon_wp_links.link_url',
    LINK_NAME: 'carbon_wp_links.link_name',
    LINK_IMAGE: 'carbon_wp_links.link_image',
    LINK_TARGET: 'carbon_wp_links.link_target',
    LINK_DESCRIPTION: 'carbon_wp_links.link_description',
    LINK_VISIBLE: 'carbon_wp_links.link_visible',
    LINK_OWNER: 'carbon_wp_links.link_owner',
    LINK_RATING: 'carbon_wp_links.link_rating',
    LINK_UPDATED: 'carbon_wp_links.link_updated',
    LINK_REL: 'carbon_wp_links.link_rel',
    LINK_NOTES: 'carbon_wp_links.link_notes',
    LINK_RSS: 'carbon_wp_links.link_rss',
    PRIMARY: [
        'carbon_wp_links.link_id',
    ],
    PRIMARY_SHORT: [
        'link_id',
    ],
    COLUMNS: {
        'carbon_wp_links.link_id': 'link_id',
        'carbon_wp_links.link_url': 'link_url',
        'carbon_wp_links.link_name': 'link_name',
        'carbon_wp_links.link_image': 'link_image',
        'carbon_wp_links.link_target': 'link_target',
        'carbon_wp_links.link_description': 'link_description',
        'carbon_wp_links.link_visible': 'link_visible',
        'carbon_wp_links.link_owner': 'link_owner',
        'carbon_wp_links.link_rating': 'link_rating',
        'carbon_wp_links.link_updated': 'link_updated',
        'carbon_wp_links.link_rel': 'link_rel',
        'carbon_wp_links.link_notes': 'link_notes',
        'carbon_wp_links.link_rss': 'link_rss',
    },
    TYPE_VALIDATION: {
        'carbon_wp_links.link_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_url': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_image': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_target': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '25',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_description': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_visible': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_owner': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_rating': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_links.link_updated': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_links.link_rel': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_notes': {
            MYSQL_TYPE: 'mediumtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_links.link_rss': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Options {
    'option_id'?: number | null;
    'option_name'?: string | null;
    'option_value'?: string | null;
    'autoload'?: string | null;
}

interface iDefineWp_Options {
    'OPTION_ID': string;
    'OPTION_NAME': string;
    'OPTION_VALUE': string;
    'AUTOLOAD': string;
}

export const wp_options: iC6RestfulModel<RestTableNames> & iDefineWp_Options = {
    TABLE_NAME: 'carbon_wp_options',
    OPTION_ID: 'carbon_wp_options.option_id',
    OPTION_NAME: 'carbon_wp_options.option_name',
    OPTION_VALUE: 'carbon_wp_options.option_value',
    AUTOLOAD: 'carbon_wp_options.autoload',
    PRIMARY: [
        'carbon_wp_options.option_id',
    ],
    PRIMARY_SHORT: [
        'option_id',
    ],
    COLUMNS: {
        'carbon_wp_options.option_id': 'option_id',
        'carbon_wp_options.option_name': 'option_name',
        'carbon_wp_options.option_value': 'option_value',
        'carbon_wp_options.autoload': 'autoload',
    },
    TYPE_VALIDATION: {
        'carbon_wp_options.option_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_options.option_name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '191',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_options.option_value': {
            MYSQL_TYPE: 'longtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_options.autoload': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Postmeta {
    'meta_id'?: number | null;
    'post_id'?: number | null;
    'meta_key'?: string | null;
    'meta_value'?: string | null;
}

interface iDefineWp_Postmeta {
    'META_ID': string;
    'POST_ID': string;
    'META_KEY': string;
    'META_VALUE': string;
}

export const wp_postmeta: iC6RestfulModel<RestTableNames> & iDefineWp_Postmeta = {
    TABLE_NAME: 'carbon_wp_postmeta',
    META_ID: 'carbon_wp_postmeta.meta_id',
    POST_ID: 'carbon_wp_postmeta.post_id',
    META_KEY: 'carbon_wp_postmeta.meta_key',
    META_VALUE: 'carbon_wp_postmeta.meta_value',
    PRIMARY: [
        'carbon_wp_postmeta.meta_id',
    ],
    PRIMARY_SHORT: [
        'meta_id',
    ],
    COLUMNS: {
        'carbon_wp_postmeta.meta_id': 'meta_id',
        'carbon_wp_postmeta.post_id': 'post_id',
        'carbon_wp_postmeta.meta_key': 'meta_key',
        'carbon_wp_postmeta.meta_value': 'meta_value',
    },
    TYPE_VALIDATION: {
        'carbon_wp_postmeta.meta_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_postmeta.post_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_postmeta.meta_key': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_postmeta.meta_value': {
            MYSQL_TYPE: 'longtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Posts {
    'ID'?: number | null;
    'post_author'?: number | null;
    'post_date'?: string;
    'post_date_gmt'?: string;
    'post_content'?: string | null;
    'post_title'?: string | null;
    'post_excerpt'?: string | null;
    'post_status'?: string | null;
    'comment_status'?: string | null;
    'ping_status'?: string | null;
    'post_password'?: string | null;
    'post_name'?: string | null;
    'to_ping'?: string | null;
    'pinged'?: string | null;
    'post_modified'?: string;
    'post_modified_gmt'?: string;
    'post_content_filtered'?: string | null;
    'post_parent'?: number | null;
    'guid'?: string | null;
    'menu_order'?: number;
    'post_type'?: string | null;
    'post_mime_type'?: string | null;
    'comment_count'?: number;
}

interface iDefineWp_Posts {
    'ID': string;
    'POST_AUTHOR': string;
    'POST_DATE': string;
    'POST_DATE_GMT': string;
    'POST_CONTENT': string;
    'POST_TITLE': string;
    'POST_EXCERPT': string;
    'POST_STATUS': string;
    'COMMENT_STATUS': string;
    'PING_STATUS': string;
    'POST_PASSWORD': string;
    'POST_NAME': string;
    'TO_PING': string;
    'PINGED': string;
    'POST_MODIFIED': string;
    'POST_MODIFIED_GMT': string;
    'POST_CONTENT_FILTERED': string;
    'POST_PARENT': string;
    'GUID': string;
    'MENU_ORDER': string;
    'POST_TYPE': string;
    'POST_MIME_TYPE': string;
    'COMMENT_COUNT': string;
}

export const wp_posts: iC6RestfulModel<RestTableNames> & iDefineWp_Posts = {
    TABLE_NAME: 'carbon_wp_posts',
    ID: 'carbon_wp_posts.ID',
    POST_AUTHOR: 'carbon_wp_posts.post_author',
    POST_DATE: 'carbon_wp_posts.post_date',
    POST_DATE_GMT: 'carbon_wp_posts.post_date_gmt',
    POST_CONTENT: 'carbon_wp_posts.post_content',
    POST_TITLE: 'carbon_wp_posts.post_title',
    POST_EXCERPT: 'carbon_wp_posts.post_excerpt',
    POST_STATUS: 'carbon_wp_posts.post_status',
    COMMENT_STATUS: 'carbon_wp_posts.comment_status',
    PING_STATUS: 'carbon_wp_posts.ping_status',
    POST_PASSWORD: 'carbon_wp_posts.post_password',
    POST_NAME: 'carbon_wp_posts.post_name',
    TO_PING: 'carbon_wp_posts.to_ping',
    PINGED: 'carbon_wp_posts.pinged',
    POST_MODIFIED: 'carbon_wp_posts.post_modified',
    POST_MODIFIED_GMT: 'carbon_wp_posts.post_modified_gmt',
    POST_CONTENT_FILTERED: 'carbon_wp_posts.post_content_filtered',
    POST_PARENT: 'carbon_wp_posts.post_parent',
    GUID: 'carbon_wp_posts.guid',
    MENU_ORDER: 'carbon_wp_posts.menu_order',
    POST_TYPE: 'carbon_wp_posts.post_type',
    POST_MIME_TYPE: 'carbon_wp_posts.post_mime_type',
    COMMENT_COUNT: 'carbon_wp_posts.comment_count',
    PRIMARY: [
        'carbon_wp_posts.ID',
    ],
    PRIMARY_SHORT: [
        'ID',
    ],
    COLUMNS: {
        'carbon_wp_posts.ID': 'ID',
        'carbon_wp_posts.post_author': 'post_author',
        'carbon_wp_posts.post_date': 'post_date',
        'carbon_wp_posts.post_date_gmt': 'post_date_gmt',
        'carbon_wp_posts.post_content': 'post_content',
        'carbon_wp_posts.post_title': 'post_title',
        'carbon_wp_posts.post_excerpt': 'post_excerpt',
        'carbon_wp_posts.post_status': 'post_status',
        'carbon_wp_posts.comment_status': 'comment_status',
        'carbon_wp_posts.ping_status': 'ping_status',
        'carbon_wp_posts.post_password': 'post_password',
        'carbon_wp_posts.post_name': 'post_name',
        'carbon_wp_posts.to_ping': 'to_ping',
        'carbon_wp_posts.pinged': 'pinged',
        'carbon_wp_posts.post_modified': 'post_modified',
        'carbon_wp_posts.post_modified_gmt': 'post_modified_gmt',
        'carbon_wp_posts.post_content_filtered': 'post_content_filtered',
        'carbon_wp_posts.post_parent': 'post_parent',
        'carbon_wp_posts.guid': 'guid',
        'carbon_wp_posts.menu_order': 'menu_order',
        'carbon_wp_posts.post_type': 'post_type',
        'carbon_wp_posts.post_mime_type': 'post_mime_type',
        'carbon_wp_posts.comment_count': 'comment_count',
    },
    TYPE_VALIDATION: {
        'carbon_wp_posts.ID': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_author': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_date': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_posts.post_date_gmt': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_posts.post_content': {
            MYSQL_TYPE: 'longtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_title': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_excerpt': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_status': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.comment_status': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.ping_status': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_password': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '200',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.to_ping': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.pinged': {
            MYSQL_TYPE: 'text',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_modified': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_posts.post_modified_gmt': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_posts.post_content_filtered': {
            MYSQL_TYPE: 'longtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_parent': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.guid': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.menu_order': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_posts.post_type': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '20',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.post_mime_type': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '100',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_posts.comment_count': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Term_Relationships {
    'object_id'?: number | null;
    'term_taxonomy_id'?: number | null;
    'term_order'?: number;
}

interface iDefineWp_Term_Relationships {
    'OBJECT_ID': string;
    'TERM_TAXONOMY_ID': string;
    'TERM_ORDER': string;
}

export const wp_term_relationships: iC6RestfulModel<RestTableNames> & iDefineWp_Term_Relationships = {
    TABLE_NAME: 'carbon_wp_term_relationships',
    OBJECT_ID: 'carbon_wp_term_relationships.object_id',
    TERM_TAXONOMY_ID: 'carbon_wp_term_relationships.term_taxonomy_id',
    TERM_ORDER: 'carbon_wp_term_relationships.term_order',
    PRIMARY: [
        'carbon_wp_term_relationships.object_id',
        'carbon_wp_term_relationships.term_taxonomy_id',
    ],
    PRIMARY_SHORT: [
        'object_id',
        'term_taxonomy_id',
    ],
    COLUMNS: {
        'carbon_wp_term_relationships.object_id': 'object_id',
        'carbon_wp_term_relationships.term_taxonomy_id': 'term_taxonomy_id',
        'carbon_wp_term_relationships.term_order': 'term_order',
    },
    TYPE_VALIDATION: {
        'carbon_wp_term_relationships.object_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_term_relationships.term_taxonomy_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_term_relationships.term_order': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Term_Taxonomy {
    'term_taxonomy_id'?: number | null;
    'term_id'?: number | null;
    'taxonomy'?: string | null;
    'description'?: string | null;
    'parent'?: number | null;
    'count'?: number;
}

interface iDefineWp_Term_Taxonomy {
    'TERM_TAXONOMY_ID': string;
    'TERM_ID': string;
    'TAXONOMY': string;
    'DESCRIPTION': string;
    'PARENT': string;
    'COUNT': string;
}

export const wp_term_taxonomy: iC6RestfulModel<RestTableNames> & iDefineWp_Term_Taxonomy = {
    TABLE_NAME: 'carbon_wp_term_taxonomy',
    TERM_TAXONOMY_ID: 'carbon_wp_term_taxonomy.term_taxonomy_id',
    TERM_ID: 'carbon_wp_term_taxonomy.term_id',
    TAXONOMY: 'carbon_wp_term_taxonomy.taxonomy',
    DESCRIPTION: 'carbon_wp_term_taxonomy.description',
    PARENT: 'carbon_wp_term_taxonomy.parent',
    COUNT: 'carbon_wp_term_taxonomy.count',
    PRIMARY: [
        'carbon_wp_term_taxonomy.term_taxonomy_id',
    ],
    PRIMARY_SHORT: [
        'term_taxonomy_id',
    ],
    COLUMNS: {
        'carbon_wp_term_taxonomy.term_taxonomy_id': 'term_taxonomy_id',
        'carbon_wp_term_taxonomy.term_id': 'term_id',
        'carbon_wp_term_taxonomy.taxonomy': 'taxonomy',
        'carbon_wp_term_taxonomy.description': 'description',
        'carbon_wp_term_taxonomy.parent': 'parent',
        'carbon_wp_term_taxonomy.count': 'count',
    },
    TYPE_VALIDATION: {
        'carbon_wp_term_taxonomy.term_taxonomy_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_term_taxonomy.term_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_term_taxonomy.taxonomy': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '32',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_term_taxonomy.description': {
            MYSQL_TYPE: 'longtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_term_taxonomy.parent': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_term_taxonomy.count': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Termmeta {
    'meta_id'?: number | null;
    'term_id'?: number | null;
    'meta_key'?: string | null;
    'meta_value'?: string | null;
}

interface iDefineWp_Termmeta {
    'META_ID': string;
    'TERM_ID': string;
    'META_KEY': string;
    'META_VALUE': string;
}

export const wp_termmeta: iC6RestfulModel<RestTableNames> & iDefineWp_Termmeta = {
    TABLE_NAME: 'carbon_wp_termmeta',
    META_ID: 'carbon_wp_termmeta.meta_id',
    TERM_ID: 'carbon_wp_termmeta.term_id',
    META_KEY: 'carbon_wp_termmeta.meta_key',
    META_VALUE: 'carbon_wp_termmeta.meta_value',
    PRIMARY: [
        'carbon_wp_termmeta.meta_id',
    ],
    PRIMARY_SHORT: [
        'meta_id',
    ],
    COLUMNS: {
        'carbon_wp_termmeta.meta_id': 'meta_id',
        'carbon_wp_termmeta.term_id': 'term_id',
        'carbon_wp_termmeta.meta_key': 'meta_key',
        'carbon_wp_termmeta.meta_value': 'meta_value',
    },
    TYPE_VALIDATION: {
        'carbon_wp_termmeta.meta_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_termmeta.term_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_termmeta.meta_key': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_termmeta.meta_value': {
            MYSQL_TYPE: 'longtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Terms {
    'term_id'?: number | null;
    'name'?: string | null;
    'slug'?: string | null;
    'term_group'?: number;
}

interface iDefineWp_Terms {
    'TERM_ID': string;
    'NAME': string;
    'SLUG': string;
    'TERM_GROUP': string;
}

export const wp_terms: iC6RestfulModel<RestTableNames> & iDefineWp_Terms = {
    TABLE_NAME: 'carbon_wp_terms',
    TERM_ID: 'carbon_wp_terms.term_id',
    NAME: 'carbon_wp_terms.name',
    SLUG: 'carbon_wp_terms.slug',
    TERM_GROUP: 'carbon_wp_terms.term_group',
    PRIMARY: [
        'carbon_wp_terms.term_id',
    ],
    PRIMARY_SHORT: [
        'term_id',
    ],
    COLUMNS: {
        'carbon_wp_terms.term_id': 'term_id',
        'carbon_wp_terms.name': 'name',
        'carbon_wp_terms.slug': 'slug',
        'carbon_wp_terms.term_group': 'term_group',
    },
    TYPE_VALIDATION: {
        'carbon_wp_terms.term_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_terms.name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '200',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_terms.slug': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '200',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_terms.term_group': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Usermeta {
    'umeta_id'?: number | null;
    'user_id'?: number | null;
    'meta_key'?: string | null;
    'meta_value'?: string | null;
}

interface iDefineWp_Usermeta {
    'UMETA_ID': string;
    'USER_ID': string;
    'META_KEY': string;
    'META_VALUE': string;
}

export const wp_usermeta: iC6RestfulModel<RestTableNames> & iDefineWp_Usermeta = {
    TABLE_NAME: 'carbon_wp_usermeta',
    UMETA_ID: 'carbon_wp_usermeta.umeta_id',
    USER_ID: 'carbon_wp_usermeta.user_id',
    META_KEY: 'carbon_wp_usermeta.meta_key',
    META_VALUE: 'carbon_wp_usermeta.meta_value',
    PRIMARY: [
        'carbon_wp_usermeta.umeta_id',
    ],
    PRIMARY_SHORT: [
        'umeta_id',
    ],
    COLUMNS: {
        'carbon_wp_usermeta.umeta_id': 'umeta_id',
        'carbon_wp_usermeta.user_id': 'user_id',
        'carbon_wp_usermeta.meta_key': 'meta_key',
        'carbon_wp_usermeta.meta_value': 'meta_value',
    },
    TYPE_VALIDATION: {
        'carbon_wp_usermeta.umeta_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_usermeta.user_id': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_usermeta.meta_key': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_usermeta.meta_value': {
            MYSQL_TYPE: 'longtext',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}

export interface iWp_Users {
    'ID'?: number | null;
    'user_login'?: string | null;
    'user_pass'?: string | null;
    'user_nicename'?: string | null;
    'user_email'?: string | null;
    'user_url'?: string | null;
    'user_registered'?: string;
    'user_activation_key'?: string | null;
    'user_status'?: number;
    'display_name'?: string | null;
}

interface iDefineWp_Users {
    'ID': string;
    'USER_LOGIN': string;
    'USER_PASS': string;
    'USER_NICENAME': string;
    'USER_EMAIL': string;
    'USER_URL': string;
    'USER_REGISTERED': string;
    'USER_ACTIVATION_KEY': string;
    'USER_STATUS': string;
    'DISPLAY_NAME': string;
}

export const wp_users: iC6RestfulModel<RestTableNames> & iDefineWp_Users = {
    TABLE_NAME: 'carbon_wp_users',
    ID: 'carbon_wp_users.ID',
    USER_LOGIN: 'carbon_wp_users.user_login',
    USER_PASS: 'carbon_wp_users.user_pass',
    USER_NICENAME: 'carbon_wp_users.user_nicename',
    USER_EMAIL: 'carbon_wp_users.user_email',
    USER_URL: 'carbon_wp_users.user_url',
    USER_REGISTERED: 'carbon_wp_users.user_registered',
    USER_ACTIVATION_KEY: 'carbon_wp_users.user_activation_key',
    USER_STATUS: 'carbon_wp_users.user_status',
    DISPLAY_NAME: 'carbon_wp_users.display_name',
    PRIMARY: [
        'carbon_wp_users.ID',
    ],
    PRIMARY_SHORT: [
        'ID',
    ],
    COLUMNS: {
        'carbon_wp_users.ID': 'ID',
        'carbon_wp_users.user_login': 'user_login',
        'carbon_wp_users.user_pass': 'user_pass',
        'carbon_wp_users.user_nicename': 'user_nicename',
        'carbon_wp_users.user_email': 'user_email',
        'carbon_wp_users.user_url': 'user_url',
        'carbon_wp_users.user_registered': 'user_registered',
        'carbon_wp_users.user_activation_key': 'user_activation_key',
        'carbon_wp_users.user_status': 'user_status',
        'carbon_wp_users.display_name': 'display_name',
    },
    TYPE_VALIDATION: {
        'carbon_wp_users.ID': {
            MYSQL_TYPE: 'bigint',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_users.user_login': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '60',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_users.user_pass': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_users.user_nicename': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '50',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_users.user_email': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '100',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_users.user_url': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '100',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_users.user_registered': {
            MYSQL_TYPE: 'datetime',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_users.user_activation_key': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '255',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
        'carbon_wp_users.user_status': {
            MYSQL_TYPE: 'int',
            MAX_LENGTH: '',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: false
        },
        'carbon_wp_users.display_name': {
            MYSQL_TYPE: 'varchar',
            MAX_LENGTH: '250',
            AUTO_INCREMENT: false,
            SKIP_COLUMN_IN_POST: true
        },
    },
    REGEX_VALIDATION: {
    },
    TABLE_REFERENCES: {
        
    },
    TABLE_REFERENCED_BY: {
        
    }
}


export const TABLES: tC6Tables = {
    carbons: carbons,
    comments: comments,
    documentation: documentation,
    feature_group_references: feature_group_references,
    features: features,
    group_references: group_references,
    groups: groups,
    history_logs: history_logs,
    location_references: location_references,
    locations: locations,
    photos: photos,
    reports: reports,
    user_followers: user_followers,
    user_groups: user_groups,
    user_messages: user_messages,
    user_sessions: user_sessions,
    user_tasks: user_tasks,
    users: users,
    wp_commentmeta: wp_commentmeta,
    wp_comments: wp_comments,
    wp_links: wp_links,
    wp_options: wp_options,
    wp_postmeta: wp_postmeta,
    wp_posts: wp_posts,
    wp_term_relationships: wp_term_relationships,
    wp_term_taxonomy: wp_term_taxonomy,
    wp_termmeta: wp_termmeta,
    wp_terms: wp_terms,
    wp_usermeta: wp_usermeta,
    wp_users: wp_users,
};

export const C6 : iC6Object = {
    ...C6Constants,
    PREFIX: RestTablePrefix,
    TABLES: TABLES,
    ...TABLES
};

export const COLUMNS = {
'carbon_carbons.entity_pk': 'entity_pk','carbon_carbons.entity_fk': 'entity_fk','carbon_carbons.entity_tag': 'entity_tag',
'carbon_comments.parent_id': 'parent_id','carbon_comments.comment_id': 'comment_id','carbon_comments.user_id': 'user_id','carbon_comments.comment': 'comment',
'carbon_documentation.documentation_uri': 'documentation_uri','carbon_documentation.documentation_data': 'documentation_data','carbon_documentation.documentation_version': 'documentation_version','carbon_documentation.documentation_active': 'documentation_active',
'carbon_feature_group_references.feature_entity_id': 'feature_entity_id','carbon_feature_group_references.group_entity_id': 'group_entity_id',
'carbon_features.feature_entity_id': 'feature_entity_id','carbon_features.feature_code': 'feature_code','carbon_features.feature_creation_date': 'feature_creation_date',
'carbon_group_references.group_id': 'group_id','carbon_group_references.allowed_to_grant_group_id': 'allowed_to_grant_group_id',
'carbon_groups.group_name': 'group_name','carbon_groups.entity_id': 'entity_id','carbon_groups.created_by': 'created_by','carbon_groups.creation_date': 'creation_date',
'carbon_history_logs.history_uuid': 'history_uuid','carbon_history_logs.history_table': 'history_table','carbon_history_logs.history_type': 'history_type','carbon_history_logs.history_data': 'history_data','carbon_history_logs.history_original_query': 'history_original_query','carbon_history_logs.history_time': 'history_time',
'carbon_location_references.entity_reference': 'entity_reference','carbon_location_references.location_reference': 'location_reference','carbon_location_references.location_time': 'location_time',
'carbon_locations.entity_id': 'entity_id','carbon_locations.latitude': 'latitude','carbon_locations.longitude': 'longitude','carbon_locations.street': 'street','carbon_locations.city': 'city','carbon_locations.state': 'state','carbon_locations.elevation': 'elevation','carbon_locations.zip': 'zip',
'carbon_photos.parent_id': 'parent_id','carbon_photos.photo_id': 'photo_id','carbon_photos.user_id': 'user_id','carbon_photos.photo_path': 'photo_path','carbon_photos.photo_description': 'photo_description',
'carbon_reports.log_level': 'log_level','carbon_reports.report': 'report','carbon_reports.date': 'date','carbon_reports.call_trace': 'call_trace',
'carbon_user_followers.follower_table_id': 'follower_table_id','carbon_user_followers.follows_user_id': 'follows_user_id','carbon_user_followers.user_id': 'user_id',
'carbon_user_groups.group_id': 'group_id','carbon_user_groups.user_id': 'user_id',
'carbon_user_messages.message_id': 'message_id','carbon_user_messages.from_user_id': 'from_user_id','carbon_user_messages.to_user_id': 'to_user_id','carbon_user_messages.message': 'message','carbon_user_messages.message_read': 'message_read','carbon_user_messages.creation_date': 'creation_date',
'carbon_user_sessions.user_id': 'user_id','carbon_user_sessions.user_ip': 'user_ip','carbon_user_sessions.session_id': 'session_id','carbon_user_sessions.session_expires': 'session_expires','carbon_user_sessions.session_data': 'session_data','carbon_user_sessions.user_online_status': 'user_online_status',
'carbon_user_tasks.task_id': 'task_id','carbon_user_tasks.user_id': 'user_id','carbon_user_tasks.from_id': 'from_id','carbon_user_tasks.task_name': 'task_name','carbon_user_tasks.task_description': 'task_description','carbon_user_tasks.percent_complete': 'percent_complete','carbon_user_tasks.start_date': 'start_date','carbon_user_tasks.end_date': 'end_date',
'carbon_users.user_username': 'user_username','carbon_users.user_password': 'user_password','carbon_users.user_id': 'user_id','carbon_users.user_type': 'user_type','carbon_users.user_sport': 'user_sport','carbon_users.user_session_id': 'user_session_id','carbon_users.user_facebook_id': 'user_facebook_id','carbon_users.user_first_name': 'user_first_name','carbon_users.user_last_name': 'user_last_name','carbon_users.user_profile_pic': 'user_profile_pic','carbon_users.user_profile_uri': 'user_profile_uri','carbon_users.user_cover_photo': 'user_cover_photo','carbon_users.user_birthday': 'user_birthday','carbon_users.user_gender': 'user_gender','carbon_users.user_about_me': 'user_about_me','carbon_users.user_rank': 'user_rank','carbon_users.user_email': 'user_email','carbon_users.user_email_code': 'user_email_code','carbon_users.user_email_confirmed': 'user_email_confirmed','carbon_users.user_generated_string': 'user_generated_string','carbon_users.user_membership': 'user_membership','carbon_users.user_deactivated': 'user_deactivated','carbon_users.user_last_login': 'user_last_login','carbon_users.user_ip': 'user_ip','carbon_users.user_education_history': 'user_education_history','carbon_users.user_location': 'user_location','carbon_users.user_creation_date': 'user_creation_date',
'carbon_wp_commentmeta.meta_id': 'meta_id','carbon_wp_commentmeta.comment_id': 'comment_id','carbon_wp_commentmeta.meta_key': 'meta_key','carbon_wp_commentmeta.meta_value': 'meta_value',
'carbon_wp_comments.comment_ID': 'comment_ID','carbon_wp_comments.comment_post_ID': 'comment_post_ID','carbon_wp_comments.comment_author': 'comment_author','carbon_wp_comments.comment_author_email': 'comment_author_email','carbon_wp_comments.comment_author_url': 'comment_author_url','carbon_wp_comments.comment_author_IP': 'comment_author_IP','carbon_wp_comments.comment_date': 'comment_date','carbon_wp_comments.comment_date_gmt': 'comment_date_gmt','carbon_wp_comments.comment_content': 'comment_content','carbon_wp_comments.comment_karma': 'comment_karma','carbon_wp_comments.comment_approved': 'comment_approved','carbon_wp_comments.comment_agent': 'comment_agent','carbon_wp_comments.comment_type': 'comment_type','carbon_wp_comments.comment_parent': 'comment_parent','carbon_wp_comments.user_id': 'user_id',
'carbon_wp_links.link_id': 'link_id','carbon_wp_links.link_url': 'link_url','carbon_wp_links.link_name': 'link_name','carbon_wp_links.link_image': 'link_image','carbon_wp_links.link_target': 'link_target','carbon_wp_links.link_description': 'link_description','carbon_wp_links.link_visible': 'link_visible','carbon_wp_links.link_owner': 'link_owner','carbon_wp_links.link_rating': 'link_rating','carbon_wp_links.link_updated': 'link_updated','carbon_wp_links.link_rel': 'link_rel','carbon_wp_links.link_notes': 'link_notes','carbon_wp_links.link_rss': 'link_rss',
'carbon_wp_options.option_id': 'option_id','carbon_wp_options.option_name': 'option_name','carbon_wp_options.option_value': 'option_value','carbon_wp_options.autoload': 'autoload',
'carbon_wp_postmeta.meta_id': 'meta_id','carbon_wp_postmeta.post_id': 'post_id','carbon_wp_postmeta.meta_key': 'meta_key','carbon_wp_postmeta.meta_value': 'meta_value',
'carbon_wp_posts.ID': 'ID','carbon_wp_posts.post_author': 'post_author','carbon_wp_posts.post_date': 'post_date','carbon_wp_posts.post_date_gmt': 'post_date_gmt','carbon_wp_posts.post_content': 'post_content','carbon_wp_posts.post_title': 'post_title','carbon_wp_posts.post_excerpt': 'post_excerpt','carbon_wp_posts.post_status': 'post_status','carbon_wp_posts.comment_status': 'comment_status','carbon_wp_posts.ping_status': 'ping_status','carbon_wp_posts.post_password': 'post_password','carbon_wp_posts.post_name': 'post_name','carbon_wp_posts.to_ping': 'to_ping','carbon_wp_posts.pinged': 'pinged','carbon_wp_posts.post_modified': 'post_modified','carbon_wp_posts.post_modified_gmt': 'post_modified_gmt','carbon_wp_posts.post_content_filtered': 'post_content_filtered','carbon_wp_posts.post_parent': 'post_parent','carbon_wp_posts.guid': 'guid','carbon_wp_posts.menu_order': 'menu_order','carbon_wp_posts.post_type': 'post_type','carbon_wp_posts.post_mime_type': 'post_mime_type','carbon_wp_posts.comment_count': 'comment_count',
'carbon_wp_term_relationships.object_id': 'object_id','carbon_wp_term_relationships.term_taxonomy_id': 'term_taxonomy_id','carbon_wp_term_relationships.term_order': 'term_order',
'carbon_wp_term_taxonomy.term_taxonomy_id': 'term_taxonomy_id','carbon_wp_term_taxonomy.term_id': 'term_id','carbon_wp_term_taxonomy.taxonomy': 'taxonomy','carbon_wp_term_taxonomy.description': 'description','carbon_wp_term_taxonomy.parent': 'parent','carbon_wp_term_taxonomy.count': 'count',
'carbon_wp_termmeta.meta_id': 'meta_id','carbon_wp_termmeta.term_id': 'term_id','carbon_wp_termmeta.meta_key': 'meta_key','carbon_wp_termmeta.meta_value': 'meta_value',
'carbon_wp_terms.term_id': 'term_id','carbon_wp_terms.name': 'name','carbon_wp_terms.slug': 'slug','carbon_wp_terms.term_group': 'term_group',
'carbon_wp_usermeta.umeta_id': 'umeta_id','carbon_wp_usermeta.user_id': 'user_id','carbon_wp_usermeta.meta_key': 'meta_key','carbon_wp_usermeta.meta_value': 'meta_value',
'carbon_wp_users.ID': 'ID','carbon_wp_users.user_login': 'user_login','carbon_wp_users.user_pass': 'user_pass','carbon_wp_users.user_nicename': 'user_nicename','carbon_wp_users.user_email': 'user_email','carbon_wp_users.user_url': 'user_url','carbon_wp_users.user_registered': 'user_registered','carbon_wp_users.user_activation_key': 'user_activation_key','carbon_wp_users.user_status': 'user_status','carbon_wp_users.display_name': 'display_name',

};


export type RestTableInterfaces = iCarbons
 | iComments
 | iDocumentation
 | iFeature_Group_References
 | iFeatures
 | iGroup_References
 | iGroups
 | iHistory_Logs
 | iLocation_References
 | iLocations
 | iPhotos
 | iReports
 | iUser_Followers
 | iUser_Groups
 | iUser_Messages
 | iUser_Sessions
 | iUser_Tasks
 | iUsers
 | iWp_Commentmeta
 | iWp_Comments
 | iWp_Links
 | iWp_Options
 | iWp_Postmeta
 | iWp_Posts
 | iWp_Term_Relationships
 | iWp_Term_Taxonomy
 | iWp_Termmeta
 | iWp_Terms
 | iWp_Usermeta
 | iWp_Users;

export type tStatefulApiData<T> = T[] | undefined | null;


// this refers to the value types of the keys above, aka values in the state
export interface iRestfulObjectArrayTypes {
    carbons: tStatefulApiData<iCarbons>,
    comments: tStatefulApiData<iComments>,
    documentation: tStatefulApiData<iDocumentation>,
    feature_group_references: tStatefulApiData<iFeature_Group_References>,
    features: tStatefulApiData<iFeatures>,
    group_references: tStatefulApiData<iGroup_References>,
    groups: tStatefulApiData<iGroups>,
    history_logs: tStatefulApiData<iHistory_Logs>,
    location_references: tStatefulApiData<iLocation_References>,
    locations: tStatefulApiData<iLocations>,
    photos: tStatefulApiData<iPhotos>,
    reports: tStatefulApiData<iReports>,
    user_followers: tStatefulApiData<iUser_Followers>,
    user_groups: tStatefulApiData<iUser_Groups>,
    user_messages: tStatefulApiData<iUser_Messages>,
    user_sessions: tStatefulApiData<iUser_Sessions>,
    user_tasks: tStatefulApiData<iUser_Tasks>,
    users: tStatefulApiData<iUsers>,
    wp_commentmeta: tStatefulApiData<iWp_Commentmeta>,
    wp_comments: tStatefulApiData<iWp_Comments>,
    wp_links: tStatefulApiData<iWp_Links>,
    wp_options: tStatefulApiData<iWp_Options>,
    wp_postmeta: tStatefulApiData<iWp_Postmeta>,
    wp_posts: tStatefulApiData<iWp_Posts>,
    wp_term_relationships: tStatefulApiData<iWp_Term_Relationships>,
    wp_term_taxonomy: tStatefulApiData<iWp_Term_Taxonomy>,
    wp_termmeta: tStatefulApiData<iWp_Termmeta>,
    wp_terms: tStatefulApiData<iWp_Terms>,
    wp_usermeta: tStatefulApiData<iWp_Usermeta>,
    wp_users: tStatefulApiData<iWp_Users>,
}

export const initialRestfulObjectsState: iRestfulObjectArrayTypes = {
    carbons: undefined,
    comments: undefined,
    documentation: undefined,
    feature_group_references: undefined,
    features: undefined,
    group_references: undefined,
    groups: undefined,
    history_logs: undefined,
    location_references: undefined,
    locations: undefined,
    photos: undefined,
    reports: undefined,
    user_followers: undefined,
    user_groups: undefined,
    user_messages: undefined,
    user_sessions: undefined,
    user_tasks: undefined,
    users: undefined,
    wp_commentmeta: undefined,
    wp_comments: undefined,
    wp_links: undefined,
    wp_options: undefined,
    wp_postmeta: undefined,
    wp_posts: undefined,
    wp_term_relationships: undefined,
    wp_term_taxonomy: undefined,
    wp_termmeta: undefined,
    wp_terms: undefined,
    wp_usermeta: undefined,
    wp_users: undefined,
};

export type tRestfulObjectArrayValues = iRestfulObjectArrayTypes[keyof iRestfulObjectArrayTypes];

