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
import {C6, iFeature_Group_References, feature_group_references, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_feature_group_references` (
  `feature_entity_id` binary(16) DEFAULT NULL,
  `group_entity_id` binary(16) DEFAULT NULL,
  KEY `carbon_feature_references_carbons_entity_pk_fk_2` (`feature_entity_id`),
  KEY `carbon_feature_group_references_carbons_entity_pk_fk` (`group_entity_id`),
  CONSTRAINT `carbon_feature_group_references_carbons_entity_pk_fk` FOREIGN KEY (`group_entity_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carbon_feature_references_carbons_entity_pk_fk` FOREIGN KEY (`feature_entity_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iFeature_Group_References, GetRequestTableOverrides, iGetC6RestResponse<iFeature_Group_References>, RestTableNames>({
    C6: C6,
    tableName: feature_group_references.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received feature_group_references!'
        request.error ??= 'An unknown issue occurred creating the feature_group_references!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iFeature_Group_References>(Array.isArray(responseData) ? responseData : [responseData], "feature_group_references", C6.feature_group_references.PRIMARY_SHORT as (keyof iFeature_Group_References)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateFeature_Group_References(response : AxiosResponse<iPutC6RestResponse<iFeature_Group_References>>, request : iAPI<Modify<iFeature_Group_References, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iFeature_Group_References>([
        removeInvalidKeys<iFeature_Group_References>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "feature_group_references", feature_group_references.PRIMARY_SHORT as (keyof iFeature_Group_References)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iFeature_Group_References, PutRequestTableOverrides, iPutC6RestResponse<iFeature_Group_References>, RestTableNames>({
    C6: C6,
    tableName: feature_group_references.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated feature_group_references data!'
        request.error ??= 'An unknown issue occurred updating the feature_group_references data!'
        return request
    },
    responseCallback: putStateFeature_Group_References
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateFeature_Group_References(response : AxiosResponse<iPostC6RestResponse<iFeature_Group_References>>, request : iAPI<Modify<iFeature_Group_References, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== feature_group_references.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[feature_group_references.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iFeature_Group_References>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iFeature_Group_References>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iFeature_Group_References>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "feature_group_references",
        feature_group_references.PRIMARY_SHORT as (keyof iFeature_Group_References)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iFeature_Group_References, PostRequestTableOverrides, iPostC6RestResponse<iFeature_Group_References>, RestTableNames>({
    C6: C6,
    tableName: feature_group_references.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the feature_group_references data!'
        request.error ??= 'An unknown issue occurred creating the feature_group_references data!'
        return request
    },
    responseCallback: postStateFeature_Group_References
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateFeature_Group_References(_response : AxiosResponse<iDeleteC6RestResponse<iFeature_Group_References>>, request : iAPI<Modify<iFeature_Group_References, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iFeature_Group_References>([
        request
    ], "feature_group_references", feature_group_references.PRIMARY_SHORT as (keyof iFeature_Group_References)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iFeature_Group_References, DeleteRequestTableOverrides, iDeleteC6RestResponse<iFeature_Group_References>, RestTableNames>({
    C6: C6,
    tableName: feature_group_references.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the feature_group_references data!'
        request.error ??= 'An unknown issue occurred removing the feature_group_references data!'
        return request
    },
    responseCallback: deleteStateFeature_Group_References
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}