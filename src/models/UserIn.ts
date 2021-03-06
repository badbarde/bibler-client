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
 * @interface UserIn
 */
export interface UserIn {
    /**
     * 
     * @type {string}
     * @memberof UserIn
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof UserIn
     */
    lastname: string;
    /**
     * 
     * @type {string}
     * @memberof UserIn
     */
    classname?: string;
}

export function UserInFromJSON(json: any): UserIn {
    return UserInFromJSONTyped(json, false);
}

export function UserInFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserIn {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'firstname': json['firstname'],
        'lastname': json['lastname'],
        'classname': !exists(json, 'classname') ? undefined : json['classname'],
    };
}

export function UserInToJSON(value?: UserIn | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'firstname': value.firstname,
        'lastname': value.lastname,
        'classname': value.classname,
    };
}


