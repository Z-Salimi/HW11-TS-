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
export interface RenderPagesParams {
  totalPages: number;
  page: number;
}

export interface SneakerParams {
  page?: number;
  limit?: number;
  brands?: string;
}
export interface Sneaker {
  pid: string;
  name: string;
  imageURL: string;
  price: number;
}

export interface SneakerP {
  name: string;
  imageURL: string;
  colors: string;
  sizes: string;
  price: number;
}