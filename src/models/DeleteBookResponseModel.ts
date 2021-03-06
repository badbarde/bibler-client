/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    DeleteBookResponseStatus,
    DeleteBookResponseStatusFromJSON,
    DeleteBookResponseStatusFromJSONTyped,
    DeleteBookResponseStatusToJSON,
} from './';

/**
 * 
 * @export
 * @interface DeleteBookResponseModel
 */
export interface DeleteBookResponseModel {
    /**
     * 
     * @type {DeleteBookResponseStatus}
     * @memberof DeleteBookResponseModel
     */
    status: DeleteBookResponseStatus;
}

export function DeleteBookResponseModelFromJSON(json: any): DeleteBookResponseModel {
    return DeleteBookResponseModelFromJSONTyped(json, false);
}

export function DeleteBookResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): DeleteBookResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': DeleteBookResponseStatusFromJSON(json['status']),
    };
}

export function DeleteBookResponseModelToJSON(value?: DeleteBookResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': DeleteBookResponseStatusToJSON(value.status),
    };
}


