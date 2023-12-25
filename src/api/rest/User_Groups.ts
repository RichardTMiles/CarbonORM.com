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
import {C6, iUser_Groups, user_groups, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_user_groups` (
  `group_id` binary(16) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  KEY `carbon_user_groups_carbons_entity_pk_fk` (`group_id`),
  KEY `carbon_user_groups_carbons_entity_pk_fk_2` (`user_id`),
  CONSTRAINT `carbon_user_groups_carbons_entity_pk_fk` FOREIGN KEY (`group_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carbon_user_groups_carbons_entity_pk_fk_2` FOREIGN KEY (`user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iUser_Groups, GetRequestTableOverrides, iGetC6RestResponse<iUser_Groups>, RestTableNames>({
    C6: C6,
    tableName: user_groups.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received user_groups!'
        request.error ??= 'An unknown issue occurred creating the user_groups!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iUser_Groups>(Array.isArray(responseData) ? responseData : [responseData], "user_groups", C6.user_groups.PRIMARY_SHORT as (keyof iUser_Groups)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateUser_Groups(response : AxiosResponse<iPutC6RestResponse<iUser_Groups>>, request : iAPI<Modify<iUser_Groups, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iUser_Groups>([
        removeInvalidKeys<iUser_Groups>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "user_groups", user_groups.PRIMARY_SHORT as (keyof iUser_Groups)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iUser_Groups, PutRequestTableOverrides, iPutC6RestResponse<iUser_Groups>, RestTableNames>({
    C6: C6,
    tableName: user_groups.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated user_groups data!'
        request.error ??= 'An unknown issue occurred updating the user_groups data!'
        return request
    },
    responseCallback: putStateUser_Groups
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateUser_Groups(response : AxiosResponse<iPostC6RestResponse<iUser_Groups>>, request : iAPI<Modify<iUser_Groups, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== user_groups.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[user_groups.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iUser_Groups>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iUser_Groups>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iUser_Groups>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "user_groups",
        user_groups.PRIMARY_SHORT as (keyof iUser_Groups)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iUser_Groups, PostRequestTableOverrides, iPostC6RestResponse<iUser_Groups>, RestTableNames>({
    C6: C6,
    tableName: user_groups.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the user_groups data!'
        request.error ??= 'An unknown issue occurred creating the user_groups data!'
        return request
    },
    responseCallback: postStateUser_Groups
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateUser_Groups(_response : AxiosResponse<iDeleteC6RestResponse<iUser_Groups>>, request : iAPI<Modify<iUser_Groups, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iUser_Groups>([
        request
    ], "user_groups", user_groups.PRIMARY_SHORT as (keyof iUser_Groups)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iUser_Groups, DeleteRequestTableOverrides, iDeleteC6RestResponse<iUser_Groups>, RestTableNames>({
    C6: C6,
    tableName: user_groups.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the user_groups data!'
        request.error ??= 'An unknown issue occurred removing the user_groups data!'
        return request
    },
    responseCallback: deleteStateUser_Groups
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}