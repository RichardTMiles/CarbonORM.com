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
import {C6, iComments, comments, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_comments` (
  `parent_id` binary(16) NOT NULL,
  `comment_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `comment` blob NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `entity_comments_entity_parent_pk_fk` (`parent_id`),
  KEY `entity_comments_entity_user_pk_fk` (`user_id`),
  CONSTRAINT `entity_comments_entity_entity_pk_fk` FOREIGN KEY (`comment_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `entity_comments_entity_parent_pk_fk` FOREIGN KEY (`parent_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `entity_comments_entity_user_pk_fk` FOREIGN KEY (`user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iComments, GetRequestTableOverrides, iGetC6RestResponse<iComments>, RestTableNames>({
    C6: C6,
    tableName: comments.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received comments!'
        request.error ??= 'An unknown issue occurred creating the comments!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iComments>(Array.isArray(responseData) ? responseData : [responseData], "comments", C6.comments.PRIMARY_SHORT as (keyof iComments)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateComments(response : AxiosResponse<iPutC6RestResponse<iComments>>, request : iAPI<Modify<iComments, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iComments>([
        removeInvalidKeys<iComments>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "comments", comments.PRIMARY_SHORT as (keyof iComments)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iComments, PutRequestTableOverrides, iPutC6RestResponse<iComments>, RestTableNames>({
    C6: C6,
    tableName: comments.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated comments data!'
        request.error ??= 'An unknown issue occurred updating the comments data!'
        return request
    },
    responseCallback: putStateComments
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateComments(response : AxiosResponse<iPostC6RestResponse<iComments>>, request : iAPI<Modify<iComments, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== comments.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[comments.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iComments>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iComments>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iComments>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "comments",
        comments.PRIMARY_SHORT as (keyof iComments)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iComments, PostRequestTableOverrides, iPostC6RestResponse<iComments>, RestTableNames>({
    C6: C6,
    tableName: comments.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the comments data!'
        request.error ??= 'An unknown issue occurred creating the comments data!'
        return request
    },
    responseCallback: postStateComments
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateComments(_response : AxiosResponse<iDeleteC6RestResponse<iComments>>, request : iAPI<Modify<iComments, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iComments>([
        request
    ], "comments", comments.PRIMARY_SHORT as (keyof iComments)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iComments, DeleteRequestTableOverrides, iDeleteC6RestResponse<iComments>, RestTableNames>({
    C6: C6,
    tableName: comments.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the comments data!'
        request.error ??= 'An unknown issue occurred removing the comments data!'
        return request
    },
    responseCallback: deleteStateComments
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}