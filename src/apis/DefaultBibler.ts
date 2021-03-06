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


import * as runtime from '../runtime';
import {
    Book,
    BookFromJSON,
    BookToJSON,
    BorrowResponseModel,
    BorrowResponseModelFromJSON,
    BorrowResponseModelToJSON,
    BorrowingUserRecord,
    BorrowingUserRecordFromJSON,
    BorrowingUserRecordToJSON,
    Category,
    CategoryFromJSON,
    CategoryToJSON,
    DeleteBookResponseModel,
    DeleteBookResponseModelFromJSON,
    DeleteBookResponseModelToJSON,
    DeleteUserResponseModel,
    DeleteUserResponseModelFromJSON,
    DeleteUserResponseModelToJSON,
    ExtendingResponseModel,
    ExtendingResponseModelFromJSON,
    ExtendingResponseModelToJSON,
    HTTPValidationError,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    PatchBookResponseModel,
    PatchBookResponseModelFromJSON,
    PatchBookResponseModelToJSON,
    PatchUserResponseModel,
    PatchUserResponseModelFromJSON,
    PatchUserResponseModelToJSON,
    PutBookResponseModel,
    PutBookResponseModelFromJSON,
    PutBookResponseModelToJSON,
    PutUserResponseModel,
    PutUserResponseModelFromJSON,
    PutUserResponseModelToJSON,
    ReturningResponseModel,
    ReturningResponseModelFromJSON,
    ReturningResponseModelToJSON,
    User,
    UserFromJSON,
    UserToJSON,
    UserIn,
    UserInFromJSON,
    UserInToJSON,
} from '../models';

export interface BookCoverExistesMediaExistsBookKeyGetRequest {
    bookKey: number;
}

export interface BorrowBookBorrowUserKeyBookKeyPatchRequest {
    userKey: number;
    bookKey: number;
    duration?: number;
}

export interface DeleteUserUserUserKeyDeleteRequest {
    userKey: number;
}

export interface ExtendBorrowPeriodExtendUserKeyBookKeyPatchRequest {
    userKey: number;
    bookKey: number;
    duration?: number;
}

export interface GetBookCoverMediaBookKeyGetRequest {
    bookKey: number;
}

export interface GetBooksBooksGetRequest {
    userKey?: number;
}

export interface ImportBooksCsvBooksImportCsvPostRequest {
    file: Blob;
}

export interface ImportUserCsvUsersImportCsvPostRequest {
    file: Blob;
}

export interface IsBorrowedBookBorrowedBookKeyGetRequest {
    bookKey: number;
}

export interface PatchBookBookBookKeyDeleteRequest {
    bookKey: number;
}

export interface PatchBookBookPatchRequest {
    book: Book;
}

export interface PatchUserUserPatchRequest {
    user: User;
}

export interface PutBookBookPutRequest {
    book: Book;
}

export interface PutUserUserPutRequest {
    userIn: UserIn;
}

export interface ReturnBookReturnUserKeyBookKeyPatchRequest {
    userKey: number;
    bookKey: number;
}

/**
 * no description
 */
export class DefaultBibler extends runtime.BaseAPI {

    /**
     * returns if a book with the key `book_key` exists
     * Book Cover Existes
     */
    async bookCoverExistesMediaExistsBookKeyGetRaw(requestParameters: BookCoverExistesMediaExistsBookKeyGetRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.bookKey === null || requestParameters.bookKey === undefined) {
            throw new runtime.RequiredError('bookKey','Required parameter requestParameters.bookKey was null or undefined when calling bookCoverExistesMediaExistsBookKeyGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/media/exists/{book_key}`.replace(`{${"book_key"}}`, encodeURIComponent(String(requestParameters.bookKey))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * returns if a book with the key `book_key` exists
     * Book Cover Existes
     */
    async bookCoverExistesMediaExistsBookKeyGet(requestParameters: BookCoverExistesMediaExistsBookKeyGetRequest): Promise<string> {
        const response = await this.bookCoverExistesMediaExistsBookKeyGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * borrow a book with the key `book_key` for the user `user_key`
     * Borrow Book
     */
    async borrowBookBorrowUserKeyBookKeyPatchRaw(requestParameters: BorrowBookBorrowUserKeyBookKeyPatchRequest): Promise<runtime.ApiResponse<BorrowResponseModel>> {
        if (requestParameters.userKey === null || requestParameters.userKey === undefined) {
            throw new runtime.RequiredError('userKey','Required parameter requestParameters.userKey was null or undefined when calling borrowBookBorrowUserKeyBookKeyPatch.');
        }

        if (requestParameters.bookKey === null || requestParameters.bookKey === undefined) {
            throw new runtime.RequiredError('bookKey','Required parameter requestParameters.bookKey was null or undefined when calling borrowBookBorrowUserKeyBookKeyPatch.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.duration !== undefined) {
            queryParameters['duration'] = requestParameters.duration;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/borrow/{user_key}/{book_key}`.replace(`{${"user_key"}}`, encodeURIComponent(String(requestParameters.userKey))).replace(`{${"book_key"}}`, encodeURIComponent(String(requestParameters.bookKey))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BorrowResponseModelFromJSON(jsonValue));
    }

    /**
     * borrow a book with the key `book_key` for the user `user_key`
     * Borrow Book
     */
    async borrowBookBorrowUserKeyBookKeyPatch(requestParameters: BorrowBookBorrowUserKeyBookKeyPatchRequest): Promise<BorrowResponseModel> {
        const response = await this.borrowBookBorrowUserKeyBookKeyPatchRaw(requestParameters);
        return await response.value();
    }

    /**
     * delete a `user` in the list of users
     * Delete User
     */
    async deleteUserUserUserKeyDeleteRaw(requestParameters: DeleteUserUserUserKeyDeleteRequest): Promise<runtime.ApiResponse<DeleteUserResponseModel>> {
        if (requestParameters.userKey === null || requestParameters.userKey === undefined) {
            throw new runtime.RequiredError('userKey','Required parameter requestParameters.userKey was null or undefined when calling deleteUserUserUserKeyDelete.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/user/{user_key}`.replace(`{${"user_key"}}`, encodeURIComponent(String(requestParameters.userKey))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeleteUserResponseModelFromJSON(jsonValue));
    }

    /**
     * delete a `user` in the list of users
     * Delete User
     */
    async deleteUserUserUserKeyDelete(requestParameters: DeleteUserUserUserKeyDeleteRequest): Promise<DeleteUserResponseModel> {
        const response = await this.deleteUserUserUserKeyDeleteRaw(requestParameters);
        return await response.value();
    }

    /**
     * export `Book`s to csv file
     * Export Books Csv
     */
    async exportBooksCsvBooksExportCsvGetRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/books/export/csv/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * export `Book`s to csv file
     * Export Books Csv
     */
    async exportBooksCsvBooksExportCsvGet(): Promise<void> {
        await this.exportBooksCsvBooksExportCsvGetRaw();
    }

    /**
     * export `Users`s to csv file
     * Export Books Csv
     */
    async exportBooksCsvUsersExportCsvGetRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/export/csv/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * export `Users`s to csv file
     * Export Books Csv
     */
    async exportBooksCsvUsersExportCsvGet(): Promise<void> {
        await this.exportBooksCsvUsersExportCsvGetRaw();
    }

    /**
     * extend the borrowing period for a a book with the key `book_key` for the user with the key `user_key`
     * Extend Borrow Period
     */
    async extendBorrowPeriodExtendUserKeyBookKeyPatchRaw(requestParameters: ExtendBorrowPeriodExtendUserKeyBookKeyPatchRequest): Promise<runtime.ApiResponse<ExtendingResponseModel>> {
        if (requestParameters.userKey === null || requestParameters.userKey === undefined) {
            throw new runtime.RequiredError('userKey','Required parameter requestParameters.userKey was null or undefined when calling extendBorrowPeriodExtendUserKeyBookKeyPatch.');
        }

        if (requestParameters.bookKey === null || requestParameters.bookKey === undefined) {
            throw new runtime.RequiredError('bookKey','Required parameter requestParameters.bookKey was null or undefined when calling extendBorrowPeriodExtendUserKeyBookKeyPatch.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.duration !== undefined) {
            queryParameters['duration'] = requestParameters.duration;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/extend/{user_key}/{book_key}`.replace(`{${"user_key"}}`, encodeURIComponent(String(requestParameters.userKey))).replace(`{${"book_key"}}`, encodeURIComponent(String(requestParameters.bookKey))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ExtendingResponseModelFromJSON(jsonValue));
    }

    /**
     * extend the borrowing period for a a book with the key `book_key` for the user with the key `user_key`
     * Extend Borrow Period
     */
    async extendBorrowPeriodExtendUserKeyBookKeyPatch(requestParameters: ExtendBorrowPeriodExtendUserKeyBookKeyPatchRequest): Promise<ExtendingResponseModel> {
        const response = await this.extendBorrowPeriodExtendUserKeyBookKeyPatchRaw(requestParameters);
        return await response.value();
    }

    /**
     * returns a list of all availabled books that are not borrowed by anyone
     * Get Available Books
     */
    async getAvailableBooksBooksAvailableGetRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/books/available`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * returns a list of all availabled books that are not borrowed by anyone
     * Get Available Books
     */
    async getAvailableBooksBooksAvailableGet(): Promise<object> {
        const response = await this.getAvailableBooksBooksAvailableGetRaw();
        return await response.value();
    }

    /**
     * returns the book cover of a book with the key `book_key`
     * Get Book Cover
     */
    async getBookCoverMediaBookKeyGetRaw(requestParameters: GetBookCoverMediaBookKeyGetRequest): Promise<runtime.ApiResponse<object>> {
        if (requestParameters.bookKey === null || requestParameters.bookKey === undefined) {
            throw new runtime.RequiredError('bookKey','Required parameter requestParameters.bookKey was null or undefined when calling getBookCoverMediaBookKeyGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/media/{book_key}`.replace(`{${"book_key"}}`, encodeURIComponent(String(requestParameters.bookKey))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * returns the book cover of a book with the key `book_key`
     * Get Book Cover
     */
    async getBookCoverMediaBookKeyGet(requestParameters: GetBookCoverMediaBookKeyGetRequest): Promise<object> {
        const response = await this.getBookCoverMediaBookKeyGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * returns a list of all books or if `user_key` is specified all  books borrowed by the user with the key `user_key`
     * Get Books
     */
    async getBooksBooksGetRaw(requestParameters: GetBooksBooksGetRequest): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.userKey !== undefined) {
            queryParameters['user_key'] = requestParameters.userKey;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/books`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * returns a list of all books or if `user_key` is specified all  books borrowed by the user with the key `user_key`
     * Get Books
     */
    async getBooksBooksGet(requestParameters: GetBooksBooksGetRequest): Promise<object> {
        const response = await this.getBooksBooksGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * return number of books
     * Get Books Count
     */
    async getBooksCountStatsBooksCountGetRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stats/books/count`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * return number of books
     * Get Books Count
     */
    async getBooksCountStatsBooksCountGet(): Promise<object> {
        const response = await this.getBooksCountStatsBooksCountGetRaw();
        return await response.value();
    }

    /**
     * return number of users
     * Get Books Count
     */
    async getBooksCountStatsUsersCountGetRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stats/users/count`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * return number of users
     * Get Books Count
     */
    async getBooksCountStatsUsersCountGet(): Promise<object> {
        const response = await this.getBooksCountStatsUsersCountGetRaw();
        return await response.value();
    }

    /**
     * returns the number of currently borrowed books
     * Get Borrowed Count
     */
    async getBorrowedCountStatsBooksBorrowedGetRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stats/books/borrowed`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * returns the number of currently borrowed books
     * Get Borrowed Count
     */
    async getBorrowedCountStatsBooksBorrowedGet(): Promise<object> {
        const response = await this.getBorrowedCountStatsBooksBorrowedGetRaw();
        return await response.value();
    }

    /**
     * returns a list of all Books together with the user that borrows it
     * Get Borrowing Users
     */
    async getBorrowingUsersUsersBorrowingGetRaw(): Promise<runtime.ApiResponse<Array<BorrowingUserRecord>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users/borrowing`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(BorrowingUserRecordFromJSON));
    }

    /**
     * returns a list of all Books together with the user that borrows it
     * Get Borrowing Users
     */
    async getBorrowingUsersUsersBorrowingGet(): Promise<Array<BorrowingUserRecord>> {
        const response = await this.getBorrowingUsersUsersBorrowingGetRaw();
        return await response.value();
    }

    /**
     * returns a list of all existing categories
     * Get Category
     */
    async getCategoryCategoryGetRaw(): Promise<runtime.ApiResponse<Array<Category>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/category`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CategoryFromJSON));
    }

    /**
     * returns a list of all existing categories
     * Get Category
     */
    async getCategoryCategoryGet(): Promise<Array<Category>> {
        const response = await this.getCategoryCategoryGetRaw();
        return await response.value();
    }

    /**
     * returns the number of books that are overdue
     * Get Overdue Count
     */
    async getOverdueCountStatsBooksOverdueGetRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/stats/books/overdue`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * returns the number of books that are overdue
     * Get Overdue Count
     */
    async getOverdueCountStatsBooksOverdueGet(): Promise<object> {
        const response = await this.getOverdueCountStatsBooksOverdueGetRaw();
        return await response.value();
    }

    /**
     * returns a list of users and the amount of books that they have borrowed
     * Get Users
     */
    async getUsersUsersGetRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * returns a list of users and the amount of books that they have borrowed
     * Get Users
     */
    async getUsersUsersGet(): Promise<object> {
        const response = await this.getUsersUsersGetRaw();
        return await response.value();
    }

    /**
     * import `Book`s from csv file
     * Import Books Csv
     */
    async importBooksCsvBooksImportCsvPostRaw(requestParameters: ImportBooksCsvBooksImportCsvPostRequest): Promise<runtime.ApiResponse<object>> {
        if (requestParameters.file === null || requestParameters.file === undefined) {
            throw new runtime.RequiredError('file','Required parameter requestParameters.file was null or undefined when calling importBooksCsvBooksImportCsvPost.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.file !== undefined) {
            formParams.append('file', requestParameters.file as any);
        }

        const response = await this.request({
            path: `/books/import/csv/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * import `Book`s from csv file
     * Import Books Csv
     */
    async importBooksCsvBooksImportCsvPost(requestParameters: ImportBooksCsvBooksImportCsvPostRequest): Promise<object> {
        const response = await this.importBooksCsvBooksImportCsvPostRaw(requestParameters);
        return await response.value();
    }

    /**
     * import `Users`s from csv file
     * Import User Csv
     */
    async importUserCsvUsersImportCsvPostRaw(requestParameters: ImportUserCsvUsersImportCsvPostRequest): Promise<runtime.ApiResponse<object>> {
        if (requestParameters.file === null || requestParameters.file === undefined) {
            throw new runtime.RequiredError('file','Required parameter requestParameters.file was null or undefined when calling importUserCsvUsersImportCsvPost.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'multipart/form-data' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters.file !== undefined) {
            formParams.append('file', requestParameters.file as any);
        }

        const response = await this.request({
            path: `/users/import/csv/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * import `Users`s from csv file
     * Import User Csv
     */
    async importUserCsvUsersImportCsvPost(requestParameters: ImportUserCsvUsersImportCsvPostRequest): Promise<object> {
        const response = await this.importUserCsvUsersImportCsvPostRaw(requestParameters);
        return await response.value();
    }

    /**
     * Index
     */
    async indexGetRaw(): Promise<runtime.ApiResponse<object>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Index
     */
    async indexGet(): Promise<object> {
        const response = await this.indexGetRaw();
        return await response.value();
    }

    /**
     * check weather a book with the key `book_key` is currently borrowed by anyone
     * Is Borrowed
     */
    async isBorrowedBookBorrowedBookKeyGetRaw(requestParameters: IsBorrowedBookBorrowedBookKeyGetRequest): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.bookKey === null || requestParameters.bookKey === undefined) {
            throw new runtime.RequiredError('bookKey','Required parameter requestParameters.bookKey was null or undefined when calling isBorrowedBookBorrowedBookKeyGet.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/book/borrowed/{book_key}`.replace(`{${"book_key"}}`, encodeURIComponent(String(requestParameters.bookKey))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * check weather a book with the key `book_key` is currently borrowed by anyone
     * Is Borrowed
     */
    async isBorrowedBookBorrowedBookKeyGet(requestParameters: IsBorrowedBookBorrowedBookKeyGetRequest): Promise<string> {
        const response = await this.isBorrowedBookBorrowedBookKeyGetRaw(requestParameters);
        return await response.value();
    }

    /**
     * Delete an existing book with the key `book_key` in the list of existing books
     * Patch Book
     */
    async patchBookBookBookKeyDeleteRaw(requestParameters: PatchBookBookBookKeyDeleteRequest): Promise<runtime.ApiResponse<DeleteBookResponseModel>> {
        if (requestParameters.bookKey === null || requestParameters.bookKey === undefined) {
            throw new runtime.RequiredError('bookKey','Required parameter requestParameters.bookKey was null or undefined when calling patchBookBookBookKeyDelete.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/book/{book_key}`.replace(`{${"book_key"}}`, encodeURIComponent(String(requestParameters.bookKey))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeleteBookResponseModelFromJSON(jsonValue));
    }

    /**
     * Delete an existing book with the key `book_key` in the list of existing books
     * Patch Book
     */
    async patchBookBookBookKeyDelete(requestParameters: PatchBookBookBookKeyDeleteRequest): Promise<DeleteBookResponseModel> {
        const response = await this.patchBookBookBookKeyDeleteRaw(requestParameters);
        return await response.value();
    }

    /**
     * Updates an existing `book` in the list of existing books
     * Patch Book
     */
    async patchBookBookPatchRaw(requestParameters: PatchBookBookPatchRequest): Promise<runtime.ApiResponse<PatchBookResponseModel>> {
        if (requestParameters.book === null || requestParameters.book === undefined) {
            throw new runtime.RequiredError('book','Required parameter requestParameters.book was null or undefined when calling patchBookBookPatch.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/book`,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: BookToJSON(requestParameters.book),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PatchBookResponseModelFromJSON(jsonValue));
    }

    /**
     * Updates an existing `book` in the list of existing books
     * Patch Book
     */
    async patchBookBookPatch(requestParameters: PatchBookBookPatchRequest): Promise<PatchBookResponseModel> {
        const response = await this.patchBookBookPatchRaw(requestParameters);
        return await response.value();
    }

    /**
     * update a `user` in the list of users
     * Patch User
     */
    async patchUserUserPatchRaw(requestParameters: PatchUserUserPatchRequest): Promise<runtime.ApiResponse<PatchUserResponseModel>> {
        if (requestParameters.user === null || requestParameters.user === undefined) {
            throw new runtime.RequiredError('user','Required parameter requestParameters.user was null or undefined when calling patchUserUserPatch.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user`,
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UserToJSON(requestParameters.user),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PatchUserResponseModelFromJSON(jsonValue));
    }

    /**
     * update a `user` in the list of users
     * Patch User
     */
    async patchUserUserPatch(requestParameters: PatchUserUserPatchRequest): Promise<PatchUserResponseModel> {
        const response = await this.patchUserUserPatchRaw(requestParameters);
        return await response.value();
    }

    /**
     * inserts a new `book` into the list of existing books
     * Put Book
     */
    async putBookBookPutRaw(requestParameters: PutBookBookPutRequest): Promise<runtime.ApiResponse<PutBookResponseModel>> {
        if (requestParameters.book === null || requestParameters.book === undefined) {
            throw new runtime.RequiredError('book','Required parameter requestParameters.book was null or undefined when calling putBookBookPut.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/book`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: BookToJSON(requestParameters.book),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PutBookResponseModelFromJSON(jsonValue));
    }

    /**
     * inserts a new `book` into the list of existing books
     * Put Book
     */
    async putBookBookPut(requestParameters: PutBookBookPutRequest): Promise<PutBookResponseModel> {
        const response = await this.putBookBookPutRaw(requestParameters);
        return await response.value();
    }

    /**
     * inserts a new user `user` into the list of existing users
     * Put User
     */
    async putUserUserPutRaw(requestParameters: PutUserUserPutRequest): Promise<runtime.ApiResponse<PutUserResponseModel>> {
        if (requestParameters.userIn === null || requestParameters.userIn === undefined) {
            throw new runtime.RequiredError('userIn','Required parameter requestParameters.userIn was null or undefined when calling putUserUserPut.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/user`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: UserInToJSON(requestParameters.userIn),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => PutUserResponseModelFromJSON(jsonValue));
    }

    /**
     * inserts a new user `user` into the list of existing users
     * Put User
     */
    async putUserUserPut(requestParameters: PutUserUserPutRequest): Promise<PutUserResponseModel> {
        const response = await this.putUserUserPutRaw(requestParameters);
        return await response.value();
    }

    /**
     * return a book with the key `book_key` as the user with the key `user_key`
     * Return Book
     */
    async returnBookReturnUserKeyBookKeyPatchRaw(requestParameters: ReturnBookReturnUserKeyBookKeyPatchRequest): Promise<runtime.ApiResponse<ReturningResponseModel>> {
        if (requestParameters.userKey === null || requestParameters.userKey === undefined) {
            throw new runtime.RequiredError('userKey','Required parameter requestParameters.userKey was null or undefined when calling returnBookReturnUserKeyBookKeyPatch.');
        }

        if (requestParameters.bookKey === null || requestParameters.bookKey === undefined) {
            throw new runtime.RequiredError('bookKey','Required parameter requestParameters.bookKey was null or undefined when calling returnBookReturnUserKeyBookKeyPatch.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/return/{user_key}/{book_key}`.replace(`{${"user_key"}}`, encodeURIComponent(String(requestParameters.userKey))).replace(`{${"book_key"}}`, encodeURIComponent(String(requestParameters.bookKey))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ReturningResponseModelFromJSON(jsonValue));
    }

    /**
     * return a book with the key `book_key` as the user with the key `user_key`
     * Return Book
     */
    async returnBookReturnUserKeyBookKeyPatch(requestParameters: ReturnBookReturnUserKeyBookKeyPatchRequest): Promise<ReturningResponseModel> {
        const response = await this.returnBookReturnUserKeyBookKeyPatchRaw(requestParameters);
        return await response.value();
    }

}
