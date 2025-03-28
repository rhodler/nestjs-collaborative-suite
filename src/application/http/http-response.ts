export enum StatusCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export interface HttpResponse<T> {
    statusCode: StatusCodes;
    message?: string;
    data?: T;
    error?: Error | string;
}

export class HttpResponseBuilder<T> {
    private response: HttpResponse<T>;

    constructor() {
        this.response = { statusCode: StatusCodes.OK };
    }

    withStatusCode(statusCode: StatusCodes): this {
        this.response.statusCode = statusCode;
        return this;
    }

    withMessage(message: string): this {
        this.response.message = message;
        return this;
    }

    withData(data: T): this {
        this.response.data = data;
        return this;
    }
    withError(error: Error | string): this {
        this.response.error = error;
        return this;
    }

    build(): HttpResponse<T> {
        return this.response;
    }
}

export const HttpResponse = {
    success<T>(data: T, message: string = 'Request successful'): HttpResponse<T> {
        return new HttpResponseBuilder<T>().withStatusCode(StatusCodes.OK).withMessage(message).withData(data).build();
    },

    created<T>(data: T, message: string = 'Resource created successfully'): HttpResponse<T> {
        return new HttpResponseBuilder<T>().withStatusCode(StatusCodes.CREATED).withMessage(message).withData(data).build();
    },

    deleted(message: string = 'Resource deleted successfully'): HttpResponse<null> {
        return new HttpResponseBuilder<null>().withStatusCode(StatusCodes.NO_CONTENT).withMessage(message).build();
    },

    error(message: string, statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR, error?: Error | string): HttpResponse<null> {
        return new HttpResponseBuilder<null>().withStatusCode(statusCode).withMessage(message).withError(error).build();
    },
};
