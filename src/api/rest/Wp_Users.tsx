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
import {C6, iWp_Users, wp_users, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_users` (
  `ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_pass` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_nicename` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_email` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_url` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `user_status` int NOT NULL DEFAULT '0',
  `display_name` varchar(250) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`),
  KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Users, GetRequestTableOverrides, iGetC6RestResponse<iWp_Users>, RestTableNames>({
    C6: C6,
    tableName: wp_users.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_users!'
        request.error ??= 'An unknown issue occurred creating the wp_users!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Users>(Array.isArray(responseData) ? responseData : [responseData], "wp_users", C6.wp_users.PRIMARY_SHORT as (keyof iWp_Users)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Users(response : AxiosResponse<iPutC6RestResponse<iWp_Users>>, request : iAPI<Modify<iWp_Users, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Users>([
        removeInvalidKeys<iWp_Users>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_users", wp_users.PRIMARY_SHORT as (keyof iWp_Users)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Users, PutRequestTableOverrides, iPutC6RestResponse<iWp_Users>, RestTableNames>({
    C6: C6,
    tableName: wp_users.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_users data!'
        request.error ??= 'An unknown issue occurred updating the wp_users data!'
        return request
    },
    responseCallback: putStateWp_Users
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Users(response : AxiosResponse<iPostC6RestResponse<iWp_Users>>, request : iAPI<Modify<iWp_Users, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_users.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_users.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Users>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Users>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Users>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_users",
        wp_users.PRIMARY_SHORT as (keyof iWp_Users)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Users, PostRequestTableOverrides, iPostC6RestResponse<iWp_Users>, RestTableNames>({
    C6: C6,
    tableName: wp_users.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_users data!'
        request.error ??= 'An unknown issue occurred creating the wp_users data!'
        return request
    },
    responseCallback: postStateWp_Users
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Users(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Users>>, request : iAPI<Modify<iWp_Users, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Users>([
        request
    ], "wp_users", wp_users.PRIMARY_SHORT as (keyof iWp_Users)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Users, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Users>, RestTableNames>({
    C6: C6,
    tableName: wp_users.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_users data!'
        request.error ??= 'An unknown issue occurred removing the wp_users data!'
        return request
    },
    responseCallback: deleteStateWp_Users
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}