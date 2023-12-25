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
import {C6, iUser_Tasks, user_tasks, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_user_tasks` (
  `task_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL COMMENT 'This is the user the task is being assigned to',
  `from_id` binary(16) DEFAULT NULL COMMENT 'Keeping this colum so forgen key will remove task if user deleted',
  `task_name` varchar(40) NOT NULL,
  `task_description` varchar(225) DEFAULT NULL,
  `percent_complete` int DEFAULT '0',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `user_tasks_entity_entity_pk_fk` (`from_id`),
  KEY `user_tasks_entity_task_pk_fk` (`task_id`),
  KEY `carbon_user_tasks_carbons_entity_pk_fk_2` (`user_id`),
  CONSTRAINT `carbon_user_tasks_carbons_entity_pk_fk` FOREIGN KEY (`task_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carbon_user_tasks_carbons_entity_pk_fk_2` FOREIGN KEY (`user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carbon_user_tasks_carbons_entity_pk_fk_3` FOREIGN KEY (`from_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iUser_Tasks, GetRequestTableOverrides, iGetC6RestResponse<iUser_Tasks>, RestTableNames>({
    C6: C6,
    tableName: user_tasks.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received user_tasks!'
        request.error ??= 'An unknown issue occurred creating the user_tasks!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iUser_Tasks>(Array.isArray(responseData) ? responseData : [responseData], "user_tasks", C6.user_tasks.PRIMARY_SHORT as (keyof iUser_Tasks)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateUser_Tasks(response : AxiosResponse<iPutC6RestResponse<iUser_Tasks>>, request : iAPI<Modify<iUser_Tasks, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iUser_Tasks>([
        removeInvalidKeys<iUser_Tasks>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "user_tasks", user_tasks.PRIMARY_SHORT as (keyof iUser_Tasks)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iUser_Tasks, PutRequestTableOverrides, iPutC6RestResponse<iUser_Tasks>, RestTableNames>({
    C6: C6,
    tableName: user_tasks.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated user_tasks data!'
        request.error ??= 'An unknown issue occurred updating the user_tasks data!'
        return request
    },
    responseCallback: putStateUser_Tasks
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateUser_Tasks(response : AxiosResponse<iPostC6RestResponse<iUser_Tasks>>, request : iAPI<Modify<iUser_Tasks, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== user_tasks.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[user_tasks.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iUser_Tasks>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iUser_Tasks>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iUser_Tasks>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "user_tasks",
        user_tasks.PRIMARY_SHORT as (keyof iUser_Tasks)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iUser_Tasks, PostRequestTableOverrides, iPostC6RestResponse<iUser_Tasks>, RestTableNames>({
    C6: C6,
    tableName: user_tasks.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the user_tasks data!'
        request.error ??= 'An unknown issue occurred creating the user_tasks data!'
        return request
    },
    responseCallback: postStateUser_Tasks
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateUser_Tasks(_response : AxiosResponse<iDeleteC6RestResponse<iUser_Tasks>>, request : iAPI<Modify<iUser_Tasks, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iUser_Tasks>([
        request
    ], "user_tasks", user_tasks.PRIMARY_SHORT as (keyof iUser_Tasks)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iUser_Tasks, DeleteRequestTableOverrides, iDeleteC6RestResponse<iUser_Tasks>, RestTableNames>({
    C6: C6,
    tableName: user_tasks.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the user_tasks data!'
        request.error ??= 'An unknown issue occurred removing the user_tasks data!'
        return request
    },
    responseCallback: deleteStateUser_Tasks
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}