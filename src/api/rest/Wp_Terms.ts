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
import {C6, iWp_Terms, wp_terms, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_terms` (
  `term_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `slug` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `term_group` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_id`),
  KEY `slug` (`slug`(191)),
  KEY `name` (`name`(191))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Terms, GetRequestTableOverrides, iGetC6RestResponse<iWp_Terms>, RestTableNames>({
    C6: C6,
    tableName: wp_terms.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_terms!'
        request.error ??= 'An unknown issue occurred creating the wp_terms!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Terms>(Array.isArray(responseData) ? responseData : [responseData], "wp_terms", C6.wp_terms.PRIMARY_SHORT as (keyof iWp_Terms)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Terms(response : AxiosResponse<iPutC6RestResponse<iWp_Terms>>, request : iAPI<Modify<iWp_Terms, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Terms>([
        removeInvalidKeys<iWp_Terms>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_terms", wp_terms.PRIMARY_SHORT as (keyof iWp_Terms)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Terms, PutRequestTableOverrides, iPutC6RestResponse<iWp_Terms>, RestTableNames>({
    C6: C6,
    tableName: wp_terms.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_terms data!'
        request.error ??= 'An unknown issue occurred updating the wp_terms data!'
        return request
    },
    responseCallback: putStateWp_Terms
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Terms(response : AxiosResponse<iPostC6RestResponse<iWp_Terms>>, request : iAPI<Modify<iWp_Terms, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_terms.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_terms.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Terms>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Terms>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Terms>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_terms",
        wp_terms.PRIMARY_SHORT as (keyof iWp_Terms)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Terms, PostRequestTableOverrides, iPostC6RestResponse<iWp_Terms>, RestTableNames>({
    C6: C6,
    tableName: wp_terms.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_terms data!'
        request.error ??= 'An unknown issue occurred creating the wp_terms data!'
        return request
    },
    responseCallback: postStateWp_Terms
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Terms(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Terms>>, request : iAPI<Modify<iWp_Terms, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Terms>([
        request
    ], "wp_terms", wp_terms.PRIMARY_SHORT as (keyof iWp_Terms)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Terms, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Terms>, RestTableNames>({
    C6: C6,
    tableName: wp_terms.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_terms data!'
        request.error ??= 'An unknown issue occurred removing the wp_terms data!'
        return request
    },
    responseCallback: deleteStateWp_Terms
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}