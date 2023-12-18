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
import {C6, iWp_Term_Relationships, wp_term_relationships, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_term_relationships` (
  `object_id` bigint unsigned NOT NULL DEFAULT '0',
  `term_taxonomy_id` bigint unsigned NOT NULL DEFAULT '0',
  `term_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  KEY `term_taxonomy_id` (`term_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Term_Relationships, GetRequestTableOverrides, iGetC6RestResponse<iWp_Term_Relationships>, RestTableNames>({
    C6: C6,
    tableName: wp_term_relationships.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_term_relationships!'
        request.error ??= 'An unknown issue occurred creating the wp_term_relationships!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Term_Relationships>(Array.isArray(responseData) ? responseData : [responseData], "wp_term_relationships", C6.wp_term_relationships.PRIMARY_SHORT as (keyof iWp_Term_Relationships)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Term_Relationships(response : AxiosResponse<iPutC6RestResponse<iWp_Term_Relationships>>, request : iAPI<Modify<iWp_Term_Relationships, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Term_Relationships>([
        removeInvalidKeys<iWp_Term_Relationships>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_term_relationships", wp_term_relationships.PRIMARY_SHORT as (keyof iWp_Term_Relationships)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Term_Relationships, PutRequestTableOverrides, iPutC6RestResponse<iWp_Term_Relationships>, RestTableNames>({
    C6: C6,
    tableName: wp_term_relationships.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_term_relationships data!'
        request.error ??= 'An unknown issue occurred updating the wp_term_relationships data!'
        return request
    },
    responseCallback: putStateWp_Term_Relationships
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Term_Relationships(response : AxiosResponse<iPostC6RestResponse<iWp_Term_Relationships>>, request : iAPI<Modify<iWp_Term_Relationships, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_term_relationships.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_term_relationships.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Term_Relationships>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Term_Relationships>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Term_Relationships>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_term_relationships",
        wp_term_relationships.PRIMARY_SHORT as (keyof iWp_Term_Relationships)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Term_Relationships, PostRequestTableOverrides, iPostC6RestResponse<iWp_Term_Relationships>, RestTableNames>({
    C6: C6,
    tableName: wp_term_relationships.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_term_relationships data!'
        request.error ??= 'An unknown issue occurred creating the wp_term_relationships data!'
        return request
    },
    responseCallback: postStateWp_Term_Relationships
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Term_Relationships(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Term_Relationships>>, request : iAPI<Modify<iWp_Term_Relationships, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Term_Relationships>([
        request
    ], "wp_term_relationships", wp_term_relationships.PRIMARY_SHORT as (keyof iWp_Term_Relationships)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Term_Relationships, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Term_Relationships>, RestTableNames>({
    C6: C6,
    tableName: wp_term_relationships.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_term_relationships data!'
        request.error ??= 'An unknown issue occurred removing the wp_term_relationships data!'
        return request
    },
    responseCallback: deleteStateWp_Term_Relationships
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}