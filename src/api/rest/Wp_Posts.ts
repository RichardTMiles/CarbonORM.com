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
import {C6, iWp_Posts, wp_posts, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_wp_posts` (
  `ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint unsigned NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_title` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_excerpt` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'open',
  `post_password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `post_name` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `to_ping` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `pinged` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `post_parent` bigint unsigned NOT NULL DEFAULT '0',
  `guid` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `menu_order` int NOT NULL DEFAULT '0',
  `post_type` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment_count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`(191)),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iWp_Posts, GetRequestTableOverrides, iGetC6RestResponse<iWp_Posts>, RestTableNames>({
    C6: C6,
    tableName: wp_posts.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received wp_posts!'
        request.error ??= 'An unknown issue occurred creating the wp_posts!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iWp_Posts>(Array.isArray(responseData) ? responseData : [responseData], "wp_posts", C6.wp_posts.PRIMARY_SHORT as (keyof iWp_Posts)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateWp_Posts(response : AxiosResponse<iPutC6RestResponse<iWp_Posts>>, request : iAPI<Modify<iWp_Posts, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iWp_Posts>([
        removeInvalidKeys<iWp_Posts>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "wp_posts", wp_posts.PRIMARY_SHORT as (keyof iWp_Posts)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iWp_Posts, PutRequestTableOverrides, iPutC6RestResponse<iWp_Posts>, RestTableNames>({
    C6: C6,
    tableName: wp_posts.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated wp_posts data!'
        request.error ??= 'An unknown issue occurred updating the wp_posts data!'
        return request
    },
    responseCallback: putStateWp_Posts
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateWp_Posts(response : AxiosResponse<iPostC6RestResponse<iWp_Posts>>, request : iAPI<Modify<iWp_Posts, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== wp_posts.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[wp_posts.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iWp_Posts>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iWp_Posts>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iWp_Posts>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "wp_posts",
        wp_posts.PRIMARY_SHORT as (keyof iWp_Posts)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iWp_Posts, PostRequestTableOverrides, iPostC6RestResponse<iWp_Posts>, RestTableNames>({
    C6: C6,
    tableName: wp_posts.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the wp_posts data!'
        request.error ??= 'An unknown issue occurred creating the wp_posts data!'
        return request
    },
    responseCallback: postStateWp_Posts
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateWp_Posts(_response : AxiosResponse<iDeleteC6RestResponse<iWp_Posts>>, request : iAPI<Modify<iWp_Posts, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iWp_Posts>([
        request
    ], "wp_posts", wp_posts.PRIMARY_SHORT as (keyof iWp_Posts)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iWp_Posts, DeleteRequestTableOverrides, iDeleteC6RestResponse<iWp_Posts>, RestTableNames>({
    C6: C6,
    tableName: wp_posts.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the wp_posts data!'
        request.error ??= 'An unknown issue occurred removing the wp_posts data!'
        return request
    },
    responseCallback: deleteStateWp_Posts
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}