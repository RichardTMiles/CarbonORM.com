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
import {C6, iGroup_References, group_references, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_group_references` (
  `group_id` binary(16) DEFAULT NULL,
  `allowed_to_grant_group_id` binary(16) DEFAULT NULL,
  KEY `carbon_group_references_carbons_entity_pk_fk` (`group_id`),
  KEY `carbon_group_references_carbons_entity_pk_fk_2` (`allowed_to_grant_group_id`),
  CONSTRAINT `carbon_group_references_carbons_entity_pk_fk` FOREIGN KEY (`group_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carbon_group_references_carbons_entity_pk_fk_2` FOREIGN KEY (`allowed_to_grant_group_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iGroup_References, GetRequestTableOverrides, iGetC6RestResponse<iGroup_References>, RestTableNames>({
    C6: C6,
    tableName: group_references.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received group_references!'
        request.error ??= 'An unknown issue occurred creating the group_references!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iGroup_References>(Array.isArray(responseData) ? responseData : [responseData], "group_references", C6.group_references.PRIMARY_SHORT as (keyof iGroup_References)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateGroup_References(response : AxiosResponse<iPutC6RestResponse<iGroup_References>>, request : iAPI<Modify<iGroup_References, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iGroup_References>([
        removeInvalidKeys<iGroup_References>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "group_references", group_references.PRIMARY_SHORT as (keyof iGroup_References)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iGroup_References, PutRequestTableOverrides, iPutC6RestResponse<iGroup_References>, RestTableNames>({
    C6: C6,
    tableName: group_references.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated group_references data!'
        request.error ??= 'An unknown issue occurred updating the group_references data!'
        return request
    },
    responseCallback: putStateGroup_References
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateGroup_References(response : AxiosResponse<iPostC6RestResponse<iGroup_References>>, request : iAPI<Modify<iGroup_References, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== group_references.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[group_references.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iGroup_References>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iGroup_References>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iGroup_References>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "group_references",
        group_references.PRIMARY_SHORT as (keyof iGroup_References)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iGroup_References, PostRequestTableOverrides, iPostC6RestResponse<iGroup_References>, RestTableNames>({
    C6: C6,
    tableName: group_references.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the group_references data!'
        request.error ??= 'An unknown issue occurred creating the group_references data!'
        return request
    },
    responseCallback: postStateGroup_References
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateGroup_References(_response : AxiosResponse<iDeleteC6RestResponse<iGroup_References>>, request : iAPI<Modify<iGroup_References, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iGroup_References>([
        request
    ], "group_references", group_references.PRIMARY_SHORT as (keyof iGroup_References)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iGroup_References, DeleteRequestTableOverrides, iDeleteC6RestResponse<iGroup_References>, RestTableNames>({
    C6: C6,
    tableName: group_references.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the group_references data!'
        request.error ??= 'An unknown issue occurred removing the group_references data!'
        return request
    },
    responseCallback: deleteStateGroup_References
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}