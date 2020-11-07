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
    PatchBookResponseStatus,
    PatchBookResponseStatusFromJSON,
    PatchBookResponseStatusFromJSONTyped,
    PatchBookResponseStatusToJSON,
} from './';

/**
 * 
 * @export
 * @interface PatchBookResponseModel
 */
export interface PatchBookResponseModel {
    /**
     * 
     * @type {PatchBookResponseStatus}
     * @memberof PatchBookResponseModel
     */
    status: PatchBookResponseStatus;
}

export function PatchBookResponseModelFromJSON(json: any): PatchBookResponseModel {
    return PatchBookResponseModelFromJSONTyped(json, false);
}

export function PatchBookResponseModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchBookResponseModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': PatchBookResponseStatusFromJSON(json['status']),
    };
}

export function PatchBookResponseModelToJSON(value?: PatchBookResponseModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': PatchBookResponseStatusToJSON(value.status),
    };
}

