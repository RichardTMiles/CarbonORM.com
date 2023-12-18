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
import {C6, iDocumentation, documentation, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_documentation` (
  `documentation_uri` varchar(255) NOT NULL,
  `documentation_data` longblob,
  `documentation_version` varchar(40) NOT NULL,
  `documentation_active` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iDocumentation, GetRequestTableOverrides, iGetC6RestResponse<iDocumentation>, RestTableNames>({
    C6: C6,
    tableName: documentation.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received documentation!'
        request.error ??= 'An unknown issue occurred creating the documentation!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iDocumentation>(Array.isArray(responseData) ? responseData : [responseData], "documentation", C6.documentation.PRIMARY_SHORT as (keyof iDocumentation)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStateDocumentation(response : AxiosResponse<iPutC6RestResponse<iDocumentation>>, request : iAPI<Modify<iDocumentation, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iDocumentation>([
        removeInvalidKeys<iDocumentation>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "documentation", documentation.PRIMARY_SHORT as (keyof iDocumentation)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iDocumentation, PutRequestTableOverrides, iPutC6RestResponse<iDocumentation>, RestTableNames>({
    C6: C6,
    tableName: documentation.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated documentation data!'
        request.error ??= 'An unknown issue occurred updating the documentation data!'
        return request
    },
    responseCallback: putStateDocumentation
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStateDocumentation(response : AxiosResponse<iPostC6RestResponse<iDocumentation>>, request : iAPI<Modify<iDocumentation, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== documentation.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[documentation.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iDocumentation>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iDocumentation>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iDocumentation>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "documentation",
        documentation.PRIMARY_SHORT as (keyof iDocumentation)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iDocumentation, PostRequestTableOverrides, iPostC6RestResponse<iDocumentation>, RestTableNames>({
    C6: C6,
    tableName: documentation.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the documentation data!'
        request.error ??= 'An unknown issue occurred creating the documentation data!'
        return request
    },
    responseCallback: postStateDocumentation
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStateDocumentation(_response : AxiosResponse<iDeleteC6RestResponse<iDocumentation>>, request : iAPI<Modify<iDocumentation, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iDocumentation>([
        request
    ], "documentation", documentation.PRIMARY_SHORT as (keyof iDocumentation)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iDocumentation, DeleteRequestTableOverrides, iDeleteC6RestResponse<iDocumentation>, RestTableNames>({
    C6: C6,
    tableName: documentation.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the documentation data!'
        request.error ??= 'An unknown issue occurred removing the documentation data!'
        return request
    },
    responseCallback: deleteStateDocumentation
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}