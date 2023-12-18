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
import {C6, iUser_Sessions, user_sessions, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_user_sessions` (
  `user_id` binary(16) NOT NULL,
  `user_ip` varchar(80) DEFAULT NULL,
  `session_id` varchar(255) NOT NULL,
  `session_expires` datetime NOT NULL,
  `session_data` text,
  `user_online_status` tinyint DEFAULT '1',
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iUser_Sessions, GetRequestTableOverrides, iGetC6RestResponse<iUser_Sessions>, RestTableNames>({
    C6: C6,
    tableName: user_sessions.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received user_sessions!'
        request.error ??= 'An unknown issue occurred creating the user_sessions!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iUser_Sessions>(Array.isArray(responseData) ? responseData : [responseData], "user_sessions", C6.user_sessions.PRIMARY_SHORT as (keyof iUser_Sessions)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateUser_Sessions(response : AxiosResponse<iPutC6RestResponse<iUser_Sessions>>, request : iAPI<Modify<iUser_Sessions, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iUser_Sessions>([
        removeInvalidKeys<iUser_Sessions>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "user_sessions", user_sessions.PRIMARY_SHORT as (keyof iUser_Sessions)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iUser_Sessions, PutRequestTableOverrides, iPutC6RestResponse<iUser_Sessions>, RestTableNames>({
    C6: C6,
    tableName: user_sessions.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated user_sessions data!'
        request.error ??= 'An unknown issue occurred updating the user_sessions data!'
        return request
    },
    responseCallback: putStateUser_Sessions
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateUser_Sessions(response : AxiosResponse<iPostC6RestResponse<iUser_Sessions>>, request : iAPI<Modify<iUser_Sessions, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== user_sessions.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[user_sessions.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iUser_Sessions>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iUser_Sessions>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iUser_Sessions>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "user_sessions",
        user_sessions.PRIMARY_SHORT as (keyof iUser_Sessions)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iUser_Sessions, PostRequestTableOverrides, iPostC6RestResponse<iUser_Sessions>, RestTableNames>({
    C6: C6,
    tableName: user_sessions.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the user_sessions data!'
        request.error ??= 'An unknown issue occurred creating the user_sessions data!'
        return request
    },
    responseCallback: postStateUser_Sessions
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateUser_Sessions(_response : AxiosResponse<iDeleteC6RestResponse<iUser_Sessions>>, request : iAPI<Modify<iUser_Sessions, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iUser_Sessions>([
        request
    ], "user_sessions", user_sessions.PRIMARY_SHORT as (keyof iUser_Sessions)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iUser_Sessions, DeleteRequestTableOverrides, iDeleteC6RestResponse<iUser_Sessions>, RestTableNames>({
    C6: C6,
    tableName: user_sessions.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the user_sessions data!'
        request.error ??= 'An unknown issue occurred removing the user_sessions data!'
        return request
    },
    responseCallback: deleteStateUser_Sessions
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}