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
import {C6, iUser_Messages, user_messages, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_user_messages` (
  `message_id` binary(16) NOT NULL,
  `from_user_id` binary(16) NOT NULL,
  `to_user_id` binary(16) NOT NULL,
  `message` text NOT NULL,
  `message_read` tinyint DEFAULT '0',
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `messages_entity_entity_pk_fk` (`message_id`),
  KEY `messages_entity_user_from_pk_fk` (`to_user_id`),
  KEY `carbon_user_messages_carbon_entity_pk_fk` (`from_user_id`),
  CONSTRAINT `carbon_user_messages_carbon_entity_pk_fk` FOREIGN KEY (`from_user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_entity_entity_pk_fk` FOREIGN KEY (`message_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_entity_user_from_pk_fk` FOREIGN KEY (`to_user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iUser_Messages, GetRequestTableOverrides, iGetC6RestResponse<iUser_Messages>, RestTableNames>({
    C6: C6,
    tableName: user_messages.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received user_messages!'
        request.error ??= 'An unknown issue occurred creating the user_messages!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iUser_Messages>(Array.isArray(responseData) ? responseData : [responseData], "user_messages", C6.user_messages.PRIMARY_SHORT as (keyof iUser_Messages)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateUser_Messages(response : AxiosResponse<iPutC6RestResponse<iUser_Messages>>, request : iAPI<Modify<iUser_Messages, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iUser_Messages>([
        removeInvalidKeys<iUser_Messages>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "user_messages", user_messages.PRIMARY_SHORT as (keyof iUser_Messages)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iUser_Messages, PutRequestTableOverrides, iPutC6RestResponse<iUser_Messages>, RestTableNames>({
    C6: C6,
    tableName: user_messages.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated user_messages data!'
        request.error ??= 'An unknown issue occurred updating the user_messages data!'
        return request
    },
    responseCallback: putStateUser_Messages
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateUser_Messages(response : AxiosResponse<iPostC6RestResponse<iUser_Messages>>, request : iAPI<Modify<iUser_Messages, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== user_messages.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[user_messages.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iUser_Messages>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iUser_Messages>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iUser_Messages>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "user_messages",
        user_messages.PRIMARY_SHORT as (keyof iUser_Messages)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iUser_Messages, PostRequestTableOverrides, iPostC6RestResponse<iUser_Messages>, RestTableNames>({
    C6: C6,
    tableName: user_messages.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the user_messages data!'
        request.error ??= 'An unknown issue occurred creating the user_messages data!'
        return request
    },
    responseCallback: postStateUser_Messages
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateUser_Messages(_response : AxiosResponse<iDeleteC6RestResponse<iUser_Messages>>, request : iAPI<Modify<iUser_Messages, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iUser_Messages>([
        request
    ], "user_messages", user_messages.PRIMARY_SHORT as (keyof iUser_Messages)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iUser_Messages, DeleteRequestTableOverrides, iDeleteC6RestResponse<iUser_Messages>, RestTableNames>({
    C6: C6,
    tableName: user_messages.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the user_messages data!'
        request.error ??= 'An unknown issue occurred removing the user_messages data!'
        return request
    },
    responseCallback: deleteStateUser_Messages
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}