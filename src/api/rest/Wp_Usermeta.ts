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
import {C6, iWp_Usermeta, wp_usermeta, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_usermeta` (
  `umeta_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `meta_value` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`umeta_id`),
  KEY `user_id` (`user_id`),
  KEY `meta_key` (`meta_key`(191))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Usermeta, GetRequestTableOverrides, iGetC6RestResponse<iWp_Usermeta>, RestTableNames>({
    C6: C6,
    tableName: wp_usermeta.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_usermeta!'
        request.error ??= 'An unknown issue occurred creating the wp_usermeta!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Usermeta>(Array.isArray(responseData) ? responseData : [responseData], "wp_usermeta", C6.wp_usermeta.PRIMARY_SHORT as (keyof iWp_Usermeta)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Usermeta(response : AxiosResponse<iPutC6RestResponse<iWp_Usermeta>>, request : iAPI<Modify<iWp_Usermeta, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Usermeta>([
        removeInvalidKeys<iWp_Usermeta>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_usermeta", wp_usermeta.PRIMARY_SHORT as (keyof iWp_Usermeta)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Usermeta, PutRequestTableOverrides, iPutC6RestResponse<iWp_Usermeta>, RestTableNames>({
    C6: C6,
    tableName: wp_usermeta.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_usermeta data!'
        request.error ??= 'An unknown issue occurred updating the wp_usermeta data!'
        return request
    },
    responseCallback: putStateWp_Usermeta
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Usermeta(response : AxiosResponse<iPostC6RestResponse<iWp_Usermeta>>, request : iAPI<Modify<iWp_Usermeta, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_usermeta.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_usermeta.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Usermeta>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Usermeta>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Usermeta>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_usermeta",
        wp_usermeta.PRIMARY_SHORT as (keyof iWp_Usermeta)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Usermeta, PostRequestTableOverrides, iPostC6RestResponse<iWp_Usermeta>, RestTableNames>({
    C6: C6,
    tableName: wp_usermeta.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_usermeta data!'
        request.error ??= 'An unknown issue occurred creating the wp_usermeta data!'
        return request
    },
    responseCallback: postStateWp_Usermeta
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Usermeta(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Usermeta>>, request : iAPI<Modify<iWp_Usermeta, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Usermeta>([
        request
    ], "wp_usermeta", wp_usermeta.PRIMARY_SHORT as (keyof iWp_Usermeta)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Usermeta, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Usermeta>, RestTableNames>({
    C6: C6,
    tableName: wp_usermeta.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_usermeta data!'
        request.error ??= 'An unknown issue occurred removing the wp_usermeta data!'
        return request
    },
    responseCallback: deleteStateWp_Usermeta
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}