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
import {C6, iLocation_References, location_references, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_location_references` (
  `entity_reference` binary(16) NOT NULL,
  `location_reference` binary(16) NOT NULL,
  `location_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `carbon_location_references_carbons_entity_pk_fk` (`entity_reference`),
  KEY `carbon_location_references_carbons_entity_pk_fk_2` (`location_reference`),
  CONSTRAINT `carbon_location_references_carbons_entity_pk_fk` FOREIGN KEY (`entity_reference`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carbon_location_references_carbons_entity_pk_fk_2` FOREIGN KEY (`location_reference`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iLocation_References, GetRequestTableOverrides, iGetC6RestResponse<iLocation_References>, RestTableNames>({
    C6: C6,
    tableName: location_references.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received location_references!'
        request.error ??= 'An unknown issue occurred creating the location_references!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iLocation_References>(Array.isArray(responseData) ? responseData : [responseData], "location_references", C6.location_references.PRIMARY_SHORT as (keyof iLocation_References)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateLocation_References(response : AxiosResponse<iPutC6RestResponse<iLocation_References>>, request : iAPI<Modify<iLocation_References, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iLocation_References>([
        removeInvalidKeys<iLocation_References>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "location_references", location_references.PRIMARY_SHORT as (keyof iLocation_References)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iLocation_References, PutRequestTableOverrides, iPutC6RestResponse<iLocation_References>, RestTableNames>({
    C6: C6,
    tableName: location_references.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated location_references data!'
        request.error ??= 'An unknown issue occurred updating the location_references data!'
        return request
    },
    responseCallback: putStateLocation_References
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateLocation_References(response : AxiosResponse<iPostC6RestResponse<iLocation_References>>, request : iAPI<Modify<iLocation_References, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== location_references.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[location_references.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iLocation_References>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iLocation_References>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iLocation_References>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "location_references",
        location_references.PRIMARY_SHORT as (keyof iLocation_References)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iLocation_References, PostRequestTableOverrides, iPostC6RestResponse<iLocation_References>, RestTableNames>({
    C6: C6,
    tableName: location_references.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the location_references data!'
        request.error ??= 'An unknown issue occurred creating the location_references data!'
        return request
    },
    responseCallback: postStateLocation_References
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateLocation_References(_response : AxiosResponse<iDeleteC6RestResponse<iLocation_References>>, request : iAPI<Modify<iLocation_References, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iLocation_References>([
        request
    ], "location_references", location_references.PRIMARY_SHORT as (keyof iLocation_References)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iLocation_References, DeleteRequestTableOverrides, iDeleteC6RestResponse<iLocation_References>, RestTableNames>({
    C6: C6,
    tableName: location_references.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the location_references data!'
        request.error ??= 'An unknown issue occurred removing the location_references data!'
        return request
    },
    responseCallback: deleteStateLocation_References
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}