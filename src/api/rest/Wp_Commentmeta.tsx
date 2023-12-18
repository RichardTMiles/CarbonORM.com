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
import {C6, iWp_Commentmeta, wp_commentmeta, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_commentmeta` (
  `meta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`meta_id`),
  KEY `comment_id` (`comment_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Commentmeta, GetRequestTableOverrides, iGetC6RestResponse<iWp_Commentmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_commentmeta.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_commentmeta!'
        request.error ??= 'An unknown issue occurred creating the wp_commentmeta!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Commentmeta>(Array.isArray(responseData) ? responseData : [responseData], "wp_commentmeta", C6.wp_commentmeta.PRIMARY_SHORT as (keyof iWp_Commentmeta)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Commentmeta(response : AxiosResponse<iPutC6RestResponse<iWp_Commentmeta>>, request : iAPI<Modify<iWp_Commentmeta, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Commentmeta>([
        removeInvalidKeys<iWp_Commentmeta>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_commentmeta", wp_commentmeta.PRIMARY_SHORT as (keyof iWp_Commentmeta)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Commentmeta, PutRequestTableOverrides, iPutC6RestResponse<iWp_Commentmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_commentmeta.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_commentmeta data!'
        request.error ??= 'An unknown issue occurred updating the wp_commentmeta data!'
        return request
    },
    responseCallback: putStateWp_Commentmeta
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Commentmeta(response : AxiosResponse<iPostC6RestResponse<iWp_Commentmeta>>, request : iAPI<Modify<iWp_Commentmeta, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_commentmeta.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_commentmeta.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Commentmeta>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Commentmeta>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Commentmeta>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_commentmeta",
        wp_commentmeta.PRIMARY_SHORT as (keyof iWp_Commentmeta)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Commentmeta, PostRequestTableOverrides, iPostC6RestResponse<iWp_Commentmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_commentmeta.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_commentmeta data!'
        request.error ??= 'An unknown issue occurred creating the wp_commentmeta data!'
        return request
    },
    responseCallback: postStateWp_Commentmeta
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Commentmeta(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Commentmeta>>, request : iAPI<Modify<iWp_Commentmeta, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Commentmeta>([
        request
    ], "wp_commentmeta", wp_commentmeta.PRIMARY_SHORT as (keyof iWp_Commentmeta)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Commentmeta, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Commentmeta>, RestTableNames>({
    C6: C6,
    tableName: wp_commentmeta.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_commentmeta data!'
        request.error ??= 'An unknown issue occurred removing the wp_commentmeta data!'
        return request
    },
    responseCallback: deleteStateWp_Commentmeta
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}