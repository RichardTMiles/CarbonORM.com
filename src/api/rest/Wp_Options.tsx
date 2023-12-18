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
import {C6, iWp_Options, wp_options, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_options` (
  `option_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(191) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `option_value` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `autoload` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`),
  KEY `autoload` (`autoload`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Options, GetRequestTableOverrides, iGetC6RestResponse<iWp_Options>, RestTableNames>({
    C6: C6,
    tableName: wp_options.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_options!'
        request.error ??= 'An unknown issue occurred creating the wp_options!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Options>(Array.isArray(responseData) ? responseData : [responseData], "wp_options", C6.wp_options.PRIMARY_SHORT as (keyof iWp_Options)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Options(response : AxiosResponse<iPutC6RestResponse<iWp_Options>>, request : iAPI<Modify<iWp_Options, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Options>([
        removeInvalidKeys<iWp_Options>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_options", wp_options.PRIMARY_SHORT as (keyof iWp_Options)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Options, PutRequestTableOverrides, iPutC6RestResponse<iWp_Options>, RestTableNames>({
    C6: C6,
    tableName: wp_options.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_options data!'
        request.error ??= 'An unknown issue occurred updating the wp_options data!'
        return request
    },
    responseCallback: putStateWp_Options
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Options(response : AxiosResponse<iPostC6RestResponse<iWp_Options>>, request : iAPI<Modify<iWp_Options, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_options.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_options.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Options>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Options>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Options>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_options",
        wp_options.PRIMARY_SHORT as (keyof iWp_Options)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Options, PostRequestTableOverrides, iPostC6RestResponse<iWp_Options>, RestTableNames>({
    C6: C6,
    tableName: wp_options.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_options data!'
        request.error ??= 'An unknown issue occurred creating the wp_options data!'
        return request
    },
    responseCallback: postStateWp_Options
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Options(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Options>>, request : iAPI<Modify<iWp_Options, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Options>([
        request
    ], "wp_options", wp_options.PRIMARY_SHORT as (keyof iWp_Options)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Options, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Options>, RestTableNames>({
    C6: C6,
    tableName: wp_options.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_options data!'
        request.error ??= 'An unknown issue occurred removing the wp_options data!'
        return request
    },
    responseCallback: deleteStateWp_Options
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}