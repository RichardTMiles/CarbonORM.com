import {AxiosResponse} from "axios";
import {
    iPostC6RestResponse,
    restRequest,
    GET,
    POST,
    PUT,
    DELETE,
    iDeleteC6RestResponse,
    iGetC6RestResponse,
    iPutC6RestResponse,
    removeInvalidKeys,
    iAPI,
    Modify
} from "@carbonorm/carbonnode";
import {deleteRestfulObjectArrays, updateRestfulObjectArrays} from "@carbonorm/carbonreact";
import {C6, iUsers, users, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_users` (
  `user_username` varchar(100) NOT NULL,
  `user_password` varchar(225) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `user_type` varchar(20) NOT NULL DEFAULT 'Athlete',
  `user_sport` varchar(20) DEFAULT 'GOLF',
  `user_session_id` varchar(225) DEFAULT NULL,
  `user_facebook_id` varchar(225) DEFAULT NULL,
  `user_first_name` varchar(25) NOT NULL,
  `user_last_name` varchar(25) NOT NULL,
  `user_profile_pic` varchar(225) DEFAULT NULL,
  `user_profile_uri` varchar(225) DEFAULT NULL,
  `user_cover_photo` varchar(225) DEFAULT NULL,
  `user_birthday` varchar(9) DEFAULT NULL,
  `user_gender` varchar(25) DEFAULT NULL,
  `user_about_me` varchar(225) DEFAULT NULL,
  `user_rank` int DEFAULT '0',
  `user_email` varchar(50) NOT NULL,
  `user_email_code` varchar(225) DEFAULT NULL,
  `user_email_confirmed` tinyint DEFAULT '0' COMMENT 'need to change to enums, but no support in rest yet',
  `user_generated_string` varchar(200) DEFAULT NULL,
  `user_membership` int DEFAULT '0',
  `user_deactivated` tinyint DEFAULT '0',
  `user_last_login` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_ip` varchar(20) NOT NULL,
  `user_education_history` varchar(200) DEFAULT NULL,
  `user_location` varchar(20) DEFAULT NULL,
  `user_creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `carbon_users_user_username_uindex` (`user_username`),
  UNIQUE KEY `user_user_profile_uri_uindex` (`user_profile_uri`),
  UNIQUE KEY `carbon_users_user_facebook_id_uindex` (`user_facebook_id`),
  CONSTRAINT `user_entity_entity_pk_fk` FOREIGN KEY (`user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iUsers, GetRequestTableOverrides, iGetC6RestResponse<iUsers>, RestTableNames>({
    C6: C6,
    tableName: users.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received users!'
        request.error ??= 'An unknown issue occurred creating the users!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iUsers>(Array.isArray(responseData) ? responseData : [responseData], "users", C6.users.PRIMARY_SHORT as (keyof iUsers)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateUsers(response : AxiosResponse<iPutC6RestResponse<iUsers>>, request : iAPI<Modify<iUsers, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iUsers>([
        removeInvalidKeys<iUsers>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "users", users.PRIMARY_SHORT as (keyof iUsers)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iUsers, PutRequestTableOverrides, iPutC6RestResponse<iUsers>, RestTableNames>({
    C6: C6,
    tableName: users.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated users data!'
        request.error ??= 'An unknown issue occurred updating the users data!'
        return request
    },
    responseCallback: putStateUsers
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateUsers(response : AxiosResponse<iPostC6RestResponse<iUsers>>, request : iAPI<Modify<iUsers, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== users.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[users.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iUsers>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iUsers>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iUsers>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "users",
        users.PRIMARY_SHORT as (keyof iUsers)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iUsers, PostRequestTableOverrides, iPostC6RestResponse<iUsers>, RestTableNames>({
    C6: C6,
    tableName: users.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the users data!'
        request.error ??= 'An unknown issue occurred creating the users data!'
        return request
    },
    responseCallback: postStateUsers
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateUsers(_response : AxiosResponse<iDeleteC6RestResponse<iUsers>>, request : iAPI<Modify<iUsers, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iUsers>([
        request
    ], "users", users.PRIMARY_SHORT as (keyof iUsers)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iUsers, DeleteRequestTableOverrides, iDeleteC6RestResponse<iUsers>, RestTableNames>({
    C6: C6,
    tableName: users.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the users data!'
        request.error ??= 'An unknown issue occurred removing the users data!'
        return request
    },
    responseCallback: deleteStateUsers
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}