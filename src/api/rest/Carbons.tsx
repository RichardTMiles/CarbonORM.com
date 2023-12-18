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
import {C6, iCarbons, carbons, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_carbons` (
  `entity_pk` binary(16) NOT NULL,
  `entity_fk` binary(16) DEFAULT NULL,
  `entity_tag` varchar(100) NOT NULL DEFAULT 'manually',
  PRIMARY KEY (`entity_pk`),
  UNIQUE KEY `entity_entity_pk_uindex` (`entity_pk`),
  KEY `entity_entity_entity_pk_fk` (`entity_fk`),
  CONSTRAINT `entity_entity_entity_pk_fk` FOREIGN KEY (`entity_fk`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iCarbons, GetRequestTableOverrides, iGetC6RestResponse<iCarbons>, RestTableNames>({
    C6: C6,
    tableName: carbons.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received carbons!'
        request.error ??= 'An unknown issue occurred creating the carbons!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iCarbons>(Array.isArray(responseData) ? responseData : [responseData], "carbons", C6.carbons.PRIMARY_SHORT as (keyof iCarbons)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateCarbons(response : AxiosResponse<iPutC6RestResponse<iCarbons>>, request : iAPI<Modify<iCarbons, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iCarbons>([
        removeInvalidKeys<iCarbons>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "carbons", carbons.PRIMARY_SHORT as (keyof iCarbons)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iCarbons, PutRequestTableOverrides, iPutC6RestResponse<iCarbons>, RestTableNames>({
    C6: C6,
    tableName: carbons.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated carbons data!'
        request.error ??= 'An unknown issue occurred updating the carbons data!'
        return request
    },
    responseCallback: putStateCarbons
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateCarbons(response : AxiosResponse<iPostC6RestResponse<iCarbons>>, request : iAPI<Modify<iCarbons, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== carbons.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[carbons.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iCarbons>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iCarbons>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iCarbons>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "carbons",
        carbons.PRIMARY_SHORT as (keyof iCarbons)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iCarbons, PostRequestTableOverrides, iPostC6RestResponse<iCarbons>, RestTableNames>({
    C6: C6,
    tableName: carbons.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the carbons data!'
        request.error ??= 'An unknown issue occurred creating the carbons data!'
        return request
    },
    responseCallback: postStateCarbons
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateCarbons(_response : AxiosResponse<iDeleteC6RestResponse<iCarbons>>, request : iAPI<Modify<iCarbons, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iCarbons>([
        request
    ], "carbons", carbons.PRIMARY_SHORT as (keyof iCarbons)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iCarbons, DeleteRequestTableOverrides, iDeleteC6RestResponse<iCarbons>, RestTableNames>({
    C6: C6,
    tableName: carbons.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the carbons data!'
        request.error ??= 'An unknown issue occurred removing the carbons data!'
        return request
    },
    responseCallback: deleteStateCarbons
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}