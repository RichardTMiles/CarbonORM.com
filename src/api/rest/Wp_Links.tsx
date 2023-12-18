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
import {C6, iWp_Links, wp_links, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_links` (
  `link_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_image` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_target` varchar(25) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_description` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_visible` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'Y',
  `link_owner` bigint unsigned NOT NULL DEFAULT '1',
  `link_rating` int NOT NULL DEFAULT '0',
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `link_notes` mediumtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `link_rss` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`link_id`),
  KEY `link_visible` (`link_visible`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Links, GetRequestTableOverrides, iGetC6RestResponse<iWp_Links>, RestTableNames>({
    C6: C6,
    tableName: wp_links.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_links!'
        request.error ??= 'An unknown issue occurred creating the wp_links!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Links>(Array.isArray(responseData) ? responseData : [responseData], "wp_links", C6.wp_links.PRIMARY_SHORT as (keyof iWp_Links)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Links(response : AxiosResponse<iPutC6RestResponse<iWp_Links>>, request : iAPI<Modify<iWp_Links, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Links>([
        removeInvalidKeys<iWp_Links>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_links", wp_links.PRIMARY_SHORT as (keyof iWp_Links)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Links, PutRequestTableOverrides, iPutC6RestResponse<iWp_Links>, RestTableNames>({
    C6: C6,
    tableName: wp_links.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_links data!'
        request.error ??= 'An unknown issue occurred updating the wp_links data!'
        return request
    },
    responseCallback: putStateWp_Links
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Links(response : AxiosResponse<iPostC6RestResponse<iWp_Links>>, request : iAPI<Modify<iWp_Links, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_links.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_links.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Links>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Links>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Links>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_links",
        wp_links.PRIMARY_SHORT as (keyof iWp_Links)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Links, PostRequestTableOverrides, iPostC6RestResponse<iWp_Links>, RestTableNames>({
    C6: C6,
    tableName: wp_links.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_links data!'
        request.error ??= 'An unknown issue occurred creating the wp_links data!'
        return request
    },
    responseCallback: postStateWp_Links
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Links(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Links>>, request : iAPI<Modify<iWp_Links, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Links>([
        request
    ], "wp_links", wp_links.PRIMARY_SHORT as (keyof iWp_Links)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Links, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Links>, RestTableNames>({
    C6: C6,
    tableName: wp_links.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_links data!'
        request.error ??= 'An unknown issue occurred removing the wp_links data!'
        return request
    },
    responseCallback: deleteStateWp_Links
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}