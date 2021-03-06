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
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {number}
     * @memberof User
     */
    key: number;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    lastname: string;
    /**
     * 
     * @type {string}
     * @memberof User
     */
    classname?: string;
}

export function UserFromJSON(json: any): User {
    return UserFromJSONTyped(json, false);
}

export function UserFromJSONTyped(json: any, ignoreDiscriminator: boolean): User {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'key': json['key'],
        'firstname': json['firstname'],
        'lastname': json['lastname'],
        'classname': !exists(json, 'classname') ? undefined : json['classname'],
    };
}

export function UserToJSON(value?: User | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'key': value.key,
        'firstname': value.firstname,
        'lastname': value.lastname,
        'classname': value.classname,
    };
}


