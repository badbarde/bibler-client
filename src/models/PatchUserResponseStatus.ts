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

/**
 * status codes for updating a user
 * @export
 * @enum {string}
 */
export enum PatchUserResponseStatus {
    Updated = 'user updated',
    NotUpdated = 'user not updated'
}

export function PatchUserResponseStatusFromJSON(json: any): PatchUserResponseStatus {
    return PatchUserResponseStatusFromJSONTyped(json, false);
}

export function PatchUserResponseStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchUserResponseStatus {
    return json as PatchUserResponseStatus;
}

export function PatchUserResponseStatusToJSON(value?: PatchUserResponseStatus | null): any {
    return value as any;
}
