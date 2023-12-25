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
import {C6, iGroups, groups, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_groups` (
  `group_name` varchar(20) NOT NULL,
  `entity_id` binary(16) NOT NULL,
  `created_by` binary(16) NOT NULL,
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`entity_id`),
  KEY `carbon_feature_groups_carbons_entity_pk_fk_2` (`created_by`),
  CONSTRAINT `carbon_feature_groups_carbons_entity_pk_fk` FOREIGN KEY (`entity_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carbon_feature_groups_carbons_entity_pk_fk_2` FOREIGN KEY (`created_by`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iGroups, GetRequestTableOverrides, iGetC6RestResponse<iGroups>, RestTableNames>({
    C6: C6,
    tableName: groups.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received groups!'
        request.error ??= 'An unknown issue occurred creating the groups!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iGroups>(Array.isArray(responseData) ? responseData : [responseData], "groups", C6.groups.PRIMARY_SHORT as (keyof iGroups)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateGroups(response : AxiosResponse<iPutC6RestResponse<iGroups>>, request : iAPI<Modify<iGroups, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iGroups>([
        removeInvalidKeys<iGroups>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "groups", groups.PRIMARY_SHORT as (keyof iGroups)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iGroups, PutRequestTableOverrides, iPutC6RestResponse<iGroups>, RestTableNames>({
    C6: C6,
    tableName: groups.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated groups data!'
        request.error ??= 'An unknown issue occurred updating the groups data!'
        return request
    },
    responseCallback: putStateGroups
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateGroups(response : AxiosResponse<iPostC6RestResponse<iGroups>>, request : iAPI<Modify<iGroups, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== groups.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[groups.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iGroups>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iGroups>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iGroups>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "groups",
        groups.PRIMARY_SHORT as (keyof iGroups)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iGroups, PostRequestTableOverrides, iPostC6RestResponse<iGroups>, RestTableNames>({
    C6: C6,
    tableName: groups.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the groups data!'
        request.error ??= 'An unknown issue occurred creating the groups data!'
        return request
    },
    responseCallback: postStateGroups
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateGroups(_response : AxiosResponse<iDeleteC6RestResponse<iGroups>>, request : iAPI<Modify<iGroups, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iGroups>([
        request
    ], "groups", groups.PRIMARY_SHORT as (keyof iGroups)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iGroups, DeleteRequestTableOverrides, iDeleteC6RestResponse<iGroups>, RestTableNames>({
    C6: C6,
    tableName: groups.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the groups data!'
        request.error ??= 'An unknown issue occurred removing the groups data!'
        return request
    },
    responseCallback: deleteStateGroups
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}