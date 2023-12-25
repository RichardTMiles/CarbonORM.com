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
import {C6, iUser_Followers, user_followers, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_user_followers` (
  `follower_table_id` binary(16) NOT NULL,
  `follows_user_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`follower_table_id`),
  KEY `followers_entity_entity_pk_fk` (`follows_user_id`),
  KEY `followers_entity_entity_followers_pk_fk` (`user_id`),
  CONSTRAINT `carbon_user_followers_carbons_entity_pk_fk` FOREIGN KEY (`follower_table_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followers_entity_entity_follows_pk_fk` FOREIGN KEY (`follows_user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followers_entity_followers_pk_fk` FOREIGN KEY (`user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iUser_Followers, GetRequestTableOverrides, iGetC6RestResponse<iUser_Followers>, RestTableNames>({
    C6: C6,
    tableName: user_followers.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received user_followers!'
        request.error ??= 'An unknown issue occurred creating the user_followers!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iUser_Followers>(Array.isArray(responseData) ? responseData : [responseData], "user_followers", C6.user_followers.PRIMARY_SHORT as (keyof iUser_Followers)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateUser_Followers(response : AxiosResponse<iPutC6RestResponse<iUser_Followers>>, request : iAPI<Modify<iUser_Followers, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iUser_Followers>([
        removeInvalidKeys<iUser_Followers>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "user_followers", user_followers.PRIMARY_SHORT as (keyof iUser_Followers)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iUser_Followers, PutRequestTableOverrides, iPutC6RestResponse<iUser_Followers>, RestTableNames>({
    C6: C6,
    tableName: user_followers.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated user_followers data!'
        request.error ??= 'An unknown issue occurred updating the user_followers data!'
        return request
    },
    responseCallback: putStateUser_Followers
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateUser_Followers(response : AxiosResponse<iPostC6RestResponse<iUser_Followers>>, request : iAPI<Modify<iUser_Followers, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== user_followers.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[user_followers.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iUser_Followers>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iUser_Followers>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iUser_Followers>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "user_followers",
        user_followers.PRIMARY_SHORT as (keyof iUser_Followers)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iUser_Followers, PostRequestTableOverrides, iPostC6RestResponse<iUser_Followers>, RestTableNames>({
    C6: C6,
    tableName: user_followers.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the user_followers data!'
        request.error ??= 'An unknown issue occurred creating the user_followers data!'
        return request
    },
    responseCallback: postStateUser_Followers
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateUser_Followers(_response : AxiosResponse<iDeleteC6RestResponse<iUser_Followers>>, request : iAPI<Modify<iUser_Followers, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iUser_Followers>([
        request
    ], "user_followers", user_followers.PRIMARY_SHORT as (keyof iUser_Followers)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iUser_Followers, DeleteRequestTableOverrides, iDeleteC6RestResponse<iUser_Followers>, RestTableNames>({
    C6: C6,
    tableName: user_followers.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the user_followers data!'
        request.error ??= 'An unknown issue occurred removing the user_followers data!'
        return request
    },
    responseCallback: deleteStateUser_Followers
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}