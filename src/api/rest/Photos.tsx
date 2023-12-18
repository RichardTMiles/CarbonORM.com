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
import {C6, iPhotos, photos, RestTableNames} from "./C6";

/**
CREATE TABLE `carbon_photos` (
  `parent_id` binary(16) NOT NULL,
  `photo_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `photo_path` varchar(225) NOT NULL,
  `photo_description` text,
  PRIMARY KEY (`parent_id`),
  UNIQUE KEY `entity_photos_photo_id_uindex` (`photo_id`),
  KEY `photos_entity_user_pk_fk` (`user_id`),
  CONSTRAINT `entity_photos_entity_entity_pk_fk` FOREIGN KEY (`photo_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `photos_entity_entity_pk_fk` FOREIGN KEY (`parent_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `photos_entity_user_pk_fk` FOREIGN KEY (`user_id`) REFERENCES `carbon_carbons` (`entity_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
**/

type GetCustomAndRequiredFields = {}

type GetRequestTableOverrides = {}

// required parameters, optional parameters, parameter type overrides, response, and table names
const Get = restRequest<GetCustomAndRequiredFields, iPhotos, GetRequestTableOverrides, iGetC6RestResponse<iPhotos>, RestTableNames>({
    C6: C6,
    tableName: photos.TABLE_NAME,
    requestMethod: GET,
    queryCallback: (request) => {
        request.success ??= 'Successfully received photos!'
        request.error ??= 'An unknown issue occurred creating the photos!'
        return request
    },
    responseCallback: (response, _request) => {
        const responseData = response?.data?.rest;
        updateRestfulObjectArrays<iPhotos>(Array.isArray(responseData) ? responseData : [responseData], "photos", C6.photos.PRIMARY_SHORT as (keyof iPhotos)[])
    }
});

type PutCustomAndRequiredFields = {}

type PutRequestTableOverrides = {}

export function putStatePhotos(response : AxiosResponse<iPutC6RestResponse<iPhotos>>, request : iAPI<Modify<iPhotos, PutRequestTableOverrides>> & PutCustomAndRequiredFields) {
    updateRestfulObjectArrays<iPhotos>([
        removeInvalidKeys<iPhotos>({
            ...request,
            ...response?.data?.rest,
        }, C6.TABLES)
    ], "photos", photos.PRIMARY_SHORT as (keyof iPhotos)[])
}

const Put = restRequest<PutCustomAndRequiredFields, iPhotos, PutRequestTableOverrides, iPutC6RestResponse<iPhotos>, RestTableNames>({
    C6: C6,
    tableName: photos.TABLE_NAME,
    requestMethod: PUT,
    queryCallback: (request) => {
        request.success ??= 'Successfully updated photos data!'
        request.error ??= 'An unknown issue occurred updating the photos data!'
        return request
    },
    responseCallback: putStatePhotos
});

type PostCustomAndRequiredFields = {}

type PostRequestTableOverrides = {}

export function postStatePhotos(response : AxiosResponse<iPostC6RestResponse<iPhotos>>, request : iAPI<Modify<iPhotos, PostRequestTableOverrides>> & PostCustomAndRequiredFields, id: string | number | boolean) {
    if ('number' === typeof id || 'string' === typeof id) {
        if (1 !== photos.PRIMARY_SHORT.length) {
            console.error("C6 received unexpected result's given the primary key length");
        } else {
            request[photos.PRIMARY_SHORT[0]] = id
        }
    }
    updateRestfulObjectArrays<iPhotos>(
        undefined !== request.dataInsertMultipleRows
            ? request.dataInsertMultipleRows.map((request, index) => {
                return removeInvalidKeys<iPhotos>({
                    ...request,
                    ...(index === 0 ? response?.data?.rest : {}),
                }, C6.TABLES)
            })
            : [
                removeInvalidKeys<iPhotos>({
                    ...request,
                    ...response?.data?.rest,
                    }, C6.TABLES)
            ],
        "photos",
        photos.PRIMARY_SHORT as (keyof iPhotos)[]
    )
}

const Post = restRequest<PostCustomAndRequiredFields, iPhotos, PostRequestTableOverrides, iPostC6RestResponse<iPhotos>, RestTableNames>({
    C6: C6,
    tableName: photos.TABLE_NAME,
    requestMethod: POST,
    queryCallback: (request) => {
        request.success ??= 'Successfully created the photos data!'
        request.error ??= 'An unknown issue occurred creating the photos data!'
        return request
    },
    responseCallback: postStatePhotos
});

type DeleteCustomAndRequiredFields = {}

type DeleteRequestTableOverrides = {}

export function deleteStatePhotos(_response : AxiosResponse<iDeleteC6RestResponse<iPhotos>>, request : iAPI<Modify<iPhotos, DeleteRequestTableOverrides>> & DeleteCustomAndRequiredFields) {
    deleteRestfulObjectArrays<iPhotos>([
        request
    ], "photos", photos.PRIMARY_SHORT as (keyof iPhotos)[])
}

const Delete = restRequest<DeleteCustomAndRequiredFields, iPhotos, DeleteRequestTableOverrides, iDeleteC6RestResponse<iPhotos>, RestTableNames>({
    C6: C6,
    tableName: photos.TABLE_NAME,
    requestMethod: DELETE,
    queryCallback: (request) => {
        request.success ??= 'Successfully removed the photos data!'
        request.error ??= 'An unknown issue occurred removing the photos data!'
        return request
    },
    responseCallback: deleteStatePhotos
});

export default {
    // Export all GET, POST, PUT, DELETE functions for each table
    Get,
    Post,
    Put,
    Delete,
}