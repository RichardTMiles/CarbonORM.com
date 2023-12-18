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
import {C6, iFeatures, features, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_features` (
  `feature_entity_id` binary(16) NOT NULL,
  `feature_code` varchar(30) NOT NULL,
  `feature_creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feature_entity_id`),
  UNIQUE KEY `carbon_features_feature_code_uindex` (`feature_code`),
  UNIQUE KEY `carbon_features_feature_entity_id_uindex` (`feature_entity_id`),
  CONSTRAINT `carbon_features_carbons_entity_pk_fk` FOREIGN KEY (`feature_entity_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iFeatures, GetRequestTableOverrides, iGetC6RestResponse<iFeatures>, RestTableNames>({
    C6: C6,
    tableName: features.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received features!'
        request.error ??= 'An unknown issue occurred creating the features!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iFeatures>(Array.isArray(responseData) ? responseData : [responseData], "features", C6.features.PRIMARY_SHORT as (keyof iFeatures)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateFeatures(response : AxiosResponse<iPutC6RestResponse<iFeatures>>, request : iAPI<Modify<iFeatures, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iFeatures>([
        removeInvalidKeys<iFeatures>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "features", features.PRIMARY_SHORT as (keyof iFeatures)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iFeatures, PutRequestTableOverrides, iPutC6RestResponse<iFeatures>, RestTableNames>({
    C6: C6,
    tableName: features.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated features data!'
        request.error ??= 'An unknown issue occurred updating the features data!'
        return request
    },
    responseCallback: putStateFeatures
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateFeatures(response : AxiosResponse<iPostC6RestResponse<iFeatures>>, request : iAPI<Modify<iFeatures, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== features.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[features.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iFeatures>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iFeatures>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iFeatures>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "features",
        features.PRIMARY_SHORT as (keyof iFeatures)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iFeatures, PostRequestTableOverrides, iPostC6RestResponse<iFeatures>, RestTableNames>({
    C6: C6,
    tableName: features.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the features data!'
        request.error ??= 'An unknown issue occurred creating the features data!'
        return request
    },
    responseCallback: postStateFeatures
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateFeatures(_response : AxiosResponse<iDeleteC6RestResponse<iFeatures>>, request : iAPI<Modify<iFeatures, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iFeatures>([
        request
    ], "features", features.PRIMARY_SHORT as (keyof iFeatures)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iFeatures, DeleteRequestTableOverrides, iDeleteC6RestResponse<iFeatures>, RestTableNames>({
    C6: C6,
    tableName: features.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the features data!'
        request.error ??= 'An unknown issue occurred removing the features data!'
        return request
    },
    responseCallback: deleteStateFeatures
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}