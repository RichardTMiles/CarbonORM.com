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
import {C6, iWp_Postmeta, wp_postmeta, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_postmeta` (
  `meta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Postmeta, GetRequestTableOverrides, iGetC6RestResponse<iWp_Postmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_postmeta.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_postmeta!'
        request.error ??= 'An unknown issue occurred creating the wp_postmeta!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Postmeta>(Array.isArray(responseData) ? responseData : [responseData], "wp_postmeta", C6.wp_postmeta.PRIMARY_SHORT as (keyof iWp_Postmeta)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Postmeta(response : AxiosResponse<iPutC6RestResponse<iWp_Postmeta>>, request : iAPI<Modify<iWp_Postmeta, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Postmeta>([
        removeInvalidKeys<iWp_Postmeta>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_postmeta", wp_postmeta.PRIMARY_SHORT as (keyof iWp_Postmeta)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Postmeta, PutRequestTableOverrides, iPutC6RestResponse<iWp_Postmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_postmeta.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_postmeta data!'
        request.error ??= 'An unknown issue occurred updating the wp_postmeta data!'
        return request
    },
    responseCallback: putStateWp_Postmeta
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Postmeta(response : AxiosResponse<iPostC6RestResponse<iWp_Postmeta>>, request : iAPI<Modify<iWp_Postmeta, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_postmeta.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_postmeta.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Postmeta>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Postmeta>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Postmeta>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_postmeta",
        wp_postmeta.PRIMARY_SHORT as (keyof iWp_Postmeta)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Postmeta, PostRequestTableOverrides, iPostC6RestResponse<iWp_Postmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_postmeta.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_postmeta data!'
        request.error ??= 'An unknown issue occurred creating the wp_postmeta data!'
        return request
    },
    responseCallback: postStateWp_Postmeta
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Postmeta(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Postmeta>>, request : iAPI<Modify<iWp_Postmeta, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Postmeta>([
        request
    ], "wp_postmeta", wp_postmeta.PRIMARY_SHORT as (keyof iWp_Postmeta)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Postmeta, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Postmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_postmeta.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_postmeta data!'
        request.error ??= 'An unknown issue occurred removing the wp_postmeta data!'
        return request
    },
    responseCallback: deleteStateWp_Postmeta
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}