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
import {C6, iReports, reports, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_reports` (
  `log_level` varchar(20) DEFAULT NULL,
  `report` text,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `call_trace` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iReports, GetRequestTableOverrides, iGetC6RestResponse<iReports>, RestTableNames>({
    C6: C6,
    tableName: reports.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received reports!'
        request.error ??= 'An unknown issue occurred creating the reports!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iReports>(Array.isArray(responseData) ? responseData : [responseData], "reports", C6.reports.PRIMARY_SHORT as (keyof iReports)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateReports(response : AxiosResponse<iPutC6RestResponse<iReports>>, request : iAPI<Modify<iReports, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iReports>([
        removeInvalidKeys<iReports>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "reports", reports.PRIMARY_SHORT as (keyof iReports)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iReports, PutRequestTableOverrides, iPutC6RestResponse<iReports>, RestTableNames>({
    C6: C6,
    tableName: reports.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated reports data!'
        request.error ??= 'An unknown issue occurred updating the reports data!'
        return request
    },
    responseCallback: putStateReports
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateReports(response : AxiosResponse<iPostC6RestResponse<iReports>>, request : iAPI<Modify<iReports, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== reports.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[reports.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iReports>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iReports>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iReports>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "reports",
        reports.PRIMARY_SHORT as (keyof iReports)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iReports, PostRequestTableOverrides, iPostC6RestResponse<iReports>, RestTableNames>({
    C6: C6,
    tableName: reports.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the reports data!'
        request.error ??= 'An unknown issue occurred creating the reports data!'
        return request
    },
    responseCallback: postStateReports
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateReports(_response : AxiosResponse<iDeleteC6RestResponse<iReports>>, request : iAPI<Modify<iReports, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iReports>([
        request
    ], "reports", reports.PRIMARY_SHORT as (keyof iReports)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iReports, DeleteRequestTableOverrides, iDeleteC6RestResponse<iReports>, RestTableNames>({
    C6: C6,
    tableName: reports.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the reports data!'
        request.error ??= 'An unknown issue occurred removing the reports data!'
        return request
    },
    responseCallback: deleteStateReports
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}