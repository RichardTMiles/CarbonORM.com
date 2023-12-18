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
import {C6, iLocations, locations, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_locations` (
  `entity_id` binary(16) NOT NULL,
  `latitude` varchar(225) DEFAULT NULL,
  `longitude` varchar(225) DEFAULT NULL,
  `street` varchar(225) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `elevation` varchar(40) DEFAULT NULL,
  `zip` int DEFAULT NULL,
  PRIMARY KEY (`entity_id`),
  UNIQUE KEY `entity_location_entity_id_uindex` (`entity_id`),
  CONSTRAINT `entity_location_entity_entity_pk_fk` FOREIGN KEY (`entity_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iLocations, GetRequestTableOverrides, iGetC6RestResponse<iLocations>, RestTableNames>({
    C6: C6,
    tableName: locations.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received locations!'
        request.error ??= 'An unknown issue occurred creating the locations!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iLocations>(Array.isArray(responseData) ? responseData : [responseData], "locations", C6.locations.PRIMARY_SHORT as (keyof iLocations)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateLocations(response : AxiosResponse<iPutC6RestResponse<iLocations>>, request : iAPI<Modify<iLocations, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iLocations>([
        removeInvalidKeys<iLocations>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "locations", locations.PRIMARY_SHORT as (keyof iLocations)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iLocations, PutRequestTableOverrides, iPutC6RestResponse<iLocations>, RestTableNames>({
    C6: C6,
    tableName: locations.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated locations data!'
        request.error ??= 'An unknown issue occurred updating the locations data!'
        return request
    },
    responseCallback: putStateLocations
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateLocations(response : AxiosResponse<iPostC6RestResponse<iLocations>>, request : iAPI<Modify<iLocations, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== locations.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[locations.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iLocations>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iLocations>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iLocations>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "locations",
        locations.PRIMARY_SHORT as (keyof iLocations)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iLocations, PostRequestTableOverrides, iPostC6RestResponse<iLocations>, RestTableNames>({
    C6: C6,
    tableName: locations.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the locations data!'
        request.error ??= 'An unknown issue occurred creating the locations data!'
        return request
    },
    responseCallback: postStateLocations
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateLocations(_response : AxiosResponse<iDeleteC6RestResponse<iLocations>>, request : iAPI<Modify<iLocations, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iLocations>([
        request
    ], "locations", locations.PRIMARY_SHORT as (keyof iLocations)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iLocations, DeleteRequestTableOverrides, iDeleteC6RestResponse<iLocations>, RestTableNames>({
    C6: C6,
    tableName: locations.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the locations data!'
        request.error ??= 'An unknown issue occurred removing the locations data!'
        return request
    },
    responseCallback: deleteStateLocations
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}