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
import {C6, iWp_Comments, wp_comments, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_comments` (
  `comment_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint unsigned NOT NULL DEFAULT '0',
  `comment_author` tinytext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `comment_author_email` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `comment_karma` int NOT NULL DEFAULT '0',
  `comment_approved` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_type` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'comment',
  `comment_parent` bigint unsigned NOT NULL DEFAULT '0',
  `user_id` bigint unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_ID`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`),
  KEY `comment_author_email` (`comment_author_email`(10))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Comments, GetRequestTableOverrides, iGetC6RestResponse<iWp_Comments>, RestTableNames>({
    C6: C6,
    tableName: wp_comments.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_comments!'
        request.error ??= 'An unknown issue occurred creating the wp_comments!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Comments>(Array.isArray(responseData) ? responseData : [responseData], "wp_comments", C6.wp_comments.PRIMARY_SHORT as (keyof iWp_Comments)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Comments(response : AxiosResponse<iPutC6RestResponse<iWp_Comments>>, request : iAPI<Modify<iWp_Comments, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Comments>([
        removeInvalidKeys<iWp_Comments>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_comments", wp_comments.PRIMARY_SHORT as (keyof iWp_Comments)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Comments, PutRequestTableOverrides, iPutC6RestResponse<iWp_Comments>, RestTableNames>({
    C6: C6,
    tableName: wp_comments.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_comments data!'
        request.error ??= 'An unknown issue occurred updating the wp_comments data!'
        return request
    },
    responseCallback: putStateWp_Comments
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Comments(response : AxiosResponse<iPostC6RestResponse<iWp_Comments>>, request : iAPI<Modify<iWp_Comments, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_comments.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_comments.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Comments>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Comments>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Comments>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_comments",
        wp_comments.PRIMARY_SHORT as (keyof iWp_Comments)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Comments, PostRequestTableOverrides, iPostC6RestResponse<iWp_Comments>, RestTableNames>({
    C6: C6,
    tableName: wp_comments.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_comments data!'
        request.error ??= 'An unknown issue occurred creating the wp_comments data!'
        return request
    },
    responseCallback: postStateWp_Comments
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Comments(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Comments>>, request : iAPI<Modify<iWp_Comments, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Comments>([
        request
    ], "wp_comments", wp_comments.PRIMARY_SHORT as (keyof iWp_Comments)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Comments, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Comments>, RestTableNames>({
    C6: C6,
    tableName: wp_comments.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_comments data!'
        request.error ??= 'An unknown issue occurred removing the wp_comments data!'
        return request
    },
    responseCallback: deleteStateWp_Comments
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}