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
import {C6, iWp_Term_Taxonomy, wp_term_taxonomy, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_term_taxonomy` (
  `term_taxonomy_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint unsigned NOT NULL DEFAULT '0',
  `taxonomy` varchar(32) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `description` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `parent` bigint unsigned NOT NULL DEFAULT '0',
  `count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_taxonomy_id`),
  UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  KEY `taxonomy` (`taxonomy`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Term_Taxonomy, GetRequestTableOverrides, iGetC6RestResponse<iWp_Term_Taxonomy>, RestTableNames>({
    C6: C6,
    tableName: wp_term_taxonomy.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_term_taxonomy!'
        request.error ??= 'An unknown issue occurred creating the wp_term_taxonomy!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Term_Taxonomy>(Array.isArray(responseData) ? responseData : [responseData], "wp_term_taxonomy", C6.wp_term_taxonomy.PRIMARY_SHORT as (keyof iWp_Term_Taxonomy)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Term_Taxonomy(response : AxiosResponse<iPutC6RestResponse<iWp_Term_Taxonomy>>, request : iAPI<Modify<iWp_Term_Taxonomy, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Term_Taxonomy>([
        removeInvalidKeys<iWp_Term_Taxonomy>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_term_taxonomy", wp_term_taxonomy.PRIMARY_SHORT as (keyof iWp_Term_Taxonomy)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Term_Taxonomy, PutRequestTableOverrides, iPutC6RestResponse<iWp_Term_Taxonomy>, RestTableNames>({
    C6: C6,
    tableName: wp_term_taxonomy.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_term_taxonomy data!'
        request.error ??= 'An unknown issue occurred updating the wp_term_taxonomy data!'
        return request
    },
    responseCallback: putStateWp_Term_Taxonomy
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Term_Taxonomy(response : AxiosResponse<iPostC6RestResponse<iWp_Term_Taxonomy>>, request : iAPI<Modify<iWp_Term_Taxonomy, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_term_taxonomy.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_term_taxonomy.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Term_Taxonomy>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Term_Taxonomy>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Term_Taxonomy>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_term_taxonomy",
        wp_term_taxonomy.PRIMARY_SHORT as (keyof iWp_Term_Taxonomy)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Term_Taxonomy, PostRequestTableOverrides, iPostC6RestResponse<iWp_Term_Taxonomy>, RestTableNames>({
    C6: C6,
    tableName: wp_term_taxonomy.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_term_taxonomy data!'
        request.error ??= 'An unknown issue occurred creating the wp_term_taxonomy data!'
        return request
    },
    responseCallback: postStateWp_Term_Taxonomy
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Term_Taxonomy(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Term_Taxonomy>>, request : iAPI<Modify<iWp_Term_Taxonomy, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Term_Taxonomy>([
        request
    ], "wp_term_taxonomy", wp_term_taxonomy.PRIMARY_SHORT as (keyof iWp_Term_Taxonomy)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Term_Taxonomy, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Term_Taxonomy>, RestTableNames>({
    C6: C6,
    tableName: wp_term_taxonomy.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_term_taxonomy data!'
        request.error ??= 'An unknown issue occurred removing the wp_term_taxonomy data!'
        return request
    },
    responseCallback: deleteStateWp_Term_Taxonomy
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}