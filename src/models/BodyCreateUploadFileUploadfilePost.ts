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
/**
 * 
 * @export
 * @interface BodyCreateUploadFileUploadfilePost
 */
export interface BodyCreateUploadFileUploadfilePost {
    /**
     * 
     * @type {Blob}
     * @memberof BodyCreateUploadFileUploadfilePost
     */
    file: Blob;
}

export function BodyCreateUploadFileUploadfilePostFromJSON(json: any): BodyCreateUploadFileUploadfilePost {
    return BodyCreateUploadFileUploadfilePostFromJSONTyped(json, false);
}

export function BodyCreateUploadFileUploadfilePostFromJSONTyped(json: any, ignoreDiscriminator: boolean): BodyCreateUploadFileUploadfilePost {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'file': json['file'],
    };
}

export function BodyCreateUploadFileUploadfilePostToJSON(value?: BodyCreateUploadFileUploadfilePost | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'file': value.file,
    };
}


