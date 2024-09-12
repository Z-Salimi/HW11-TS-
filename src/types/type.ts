export interface AuthData {
  username: string;
  password: string;
}

export interface ErrorResponseData {
  message?: string | string[];
  statusCode?: number;
}

export interface ErrorResponse {
  response?: {
    data?: ErrorResponseData;
  };
}
