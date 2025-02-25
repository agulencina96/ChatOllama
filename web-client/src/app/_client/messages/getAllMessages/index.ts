/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { createIGetAllMessagesResponseFromDiscriminatorValue, type IGetAllMessagesResponse } from '../../models/';
// @ts-ignore
import { type BaseRequestBuilder, type Guid, type Parsable, type ParsableFactory, type RequestConfiguration, type RequestInformation, type RequestsMetadata } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /messages/GetAllMessages
 */
export interface GetAllMessagesRequestBuilder extends BaseRequestBuilder<GetAllMessagesRequestBuilder> {
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<IGetAllMessagesResponse>}
     */
     get(requestConfiguration?: RequestConfiguration<GetAllMessagesRequestBuilderGetQueryParameters> | undefined) : Promise<IGetAllMessagesResponse | undefined>;
    /**
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
     toGetRequestInformation(requestConfiguration?: RequestConfiguration<GetAllMessagesRequestBuilderGetQueryParameters> | undefined) : RequestInformation;
}
export interface GetAllMessagesRequestBuilderGetQueryParameters {
    chatId?: Guid;
}
/**
 * Uri template for the request builder.
 */
export const GetAllMessagesRequestBuilderUriTemplate = "{+baseurl}/messages/GetAllMessages{?chatId*}";
/**
 * Metadata for all the requests in the request builder.
 */
export const GetAllMessagesRequestBuilderRequestsMetadata: RequestsMetadata = {
    get: {
        uriTemplate: GetAllMessagesRequestBuilderUriTemplate,
        responseBodyContentType: "application/json, text/plain;q=0.9",
        adapterMethodName: "send",
        responseBodyFactory:  createIGetAllMessagesResponseFromDiscriminatorValue,
    },
};
/* tslint:enable */
/* eslint-enable */
