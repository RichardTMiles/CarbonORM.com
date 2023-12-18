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
import {C6, iWp_Termmeta, wp_termmeta, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_termmeta` (
  `meta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`meta_id`),
  KEY `term_id` (`term_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Termmeta, GetRequestTableOverrides, iGetC6RestResponse<iWp_Termmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_termmeta.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_termmeta!'
        request.error ??= 'An unknown issue occurred creating the wp_termmeta!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Termmeta>(Array.isArray(responseData) ? responseData : [responseData], "wp_termmeta", C6.wp_termmeta.PRIMARY_SHORT as (keyof iWp_Termmeta)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Termmeta(response : AxiosResponse<iPutC6RestResponse<iWp_Termmeta>>, request : iAPI<Modify<iWp_Termmeta, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Termmeta>([
        removeInvalidKeys<iWp_Termmeta>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_termmeta", wp_termmeta.PRIMARY_SHORT as (keyof iWp_Termmeta)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Termmeta, PutRequestTableOverrides, iPutC6RestResponse<iWp_Termmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_termmeta.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_termmeta data!'
        request.error ??= 'An unknown issue occurred updating the wp_termmeta data!'
        return request
    },
    responseCallback: putStateWp_Termmeta
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Termmeta(response : AxiosResponse<iPostC6RestResponse<iWp_Termmeta>>, request : iAPI<Modify<iWp_Termmeta, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_termmeta.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_termmeta.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Termmeta>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Termmeta>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Termmeta>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_termmeta",
        wp_termmeta.PRIMARY_SHORT as (keyof iWp_Termmeta)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Termmeta, PostRequestTableOverrides, iPostC6RestResponse<iWp_Termmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_termmeta.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_termmeta data!'
        request.error ??= 'An unknown issue occurred creating the wp_termmeta data!'
        return request
    },
    responseCallback: postStateWp_Termmeta
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Termmeta(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Termmeta>>, request : iAPI<Modify<iWp_Termmeta, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Termmeta>([
        request
    ], "wp_termmeta", wp_termmeta.PRIMARY_SHORT as (keyof iWp_Termmeta)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Termmeta, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Termmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_termmeta.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_termmeta data!'
        request.error ??= 'An unknown issue occurred removing the wp_termmeta data!'
        return request
    },
    responseCallback: deleteStateWp_Termmeta
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}