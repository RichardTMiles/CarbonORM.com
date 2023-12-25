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
import {C6, iHistory_Logs, history_logs, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_history_logs` (
  `history_uuid` binary(16) NOT NULL,
  `history_table` varchar(255) DEFAULT NULL,
  `history_type` varchar(20) DEFAULT NULL,
  `history_data` json DEFAULT NULL,
  `history_original_query` varchar(1024) DEFAULT NULL,
  `history_time` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iHistory_Logs, GetRequestTableOverrides, iGetC6RestResponse<iHistory_Logs>, RestTableNames>({
    C6: C6,
    tableName: history_logs.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received history_logs!'
        request.error ??= 'An unknown issue occurred creating the history_logs!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iHistory_Logs>(Array.isArray(responseData) ? responseData : [responseData], "history_logs", C6.history_logs.PRIMARY_SHORT as (keyof iHistory_Logs)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateHistory_Logs(response : AxiosResponse<iPutC6RestResponse<iHistory_Logs>>, request : iAPI<Modify<iHistory_Logs, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iHistory_Logs>([
        removeInvalidKeys<iHistory_Logs>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "history_logs", history_logs.PRIMARY_SHORT as (keyof iHistory_Logs)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iHistory_Logs, PutRequestTableOverrides, iPutC6RestResponse<iHistory_Logs>, RestTableNames>({
    C6: C6,
    tableName: history_logs.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated history_logs data!'
        request.error ??= 'An unknown issue occurred updating the history_logs data!'
        return request
    },
    responseCallback: putStateHistory_Logs
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateHistory_Logs(response : AxiosResponse<iPostC6RestResponse<iHistory_Logs>>, request : iAPI<Modify<iHistory_Logs, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== history_logs.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[history_logs.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iHistory_Logs>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iHistory_Logs>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iHistory_Logs>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "history_logs",
        history_logs.PRIMARY_SHORT as (keyof iHistory_Logs)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iHistory_Logs, PostRequestTableOverrides, iPostC6RestResponse<iHistory_Logs>, RestTableNames>({
    C6: C6,
    tableName: history_logs.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the history_logs data!'
        request.error ??= 'An unknown issue occurred creating the history_logs data!'
        return request
    },
    responseCallback: postStateHistory_Logs
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateHistory_Logs(_response : AxiosResponse<iDeleteC6RestResponse<iHistory_Logs>>, request : iAPI<Modify<iHistory_Logs, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iHistory_Logs>([
        request
    ], "history_logs", history_logs.PRIMARY_SHORT as (keyof iHistory_Logs)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iHistory_Logs, DeleteRequestTableOverrides, iDeleteC6RestResponse<iHistory_Logs>, RestTableNames>({
    C6: C6,
    tableName: history_logs.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the history_logs data!'
        request.error ??= 'An unknown issue occurred removing the history_logs data!'
        return request
    },
    responseCallback: deleteStateHistory_Logs
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}